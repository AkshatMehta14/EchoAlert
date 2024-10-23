import { LocationData } from "@/screens/AlertScreen";
import { useEffect, useState } from "react";
import { Heatmap } from "react-native-maps";

interface HeatmapProps {
  coords: LocationData[];
}

type kMeansResult = { objective: number } & LocationData;

interface HeatMapData {
  centroids: LocationData[];
  clusterPoints: Map<number, LocationData[]>;
}

interface WeightedLatLng {
  latitude: number;
  longitude: number;
  weight?: number;
}

const argmin = (values: number[]) => {
  let minVal = Infinity;
  let minIdx = -1;

  values.forEach((value, idx) => {
    if (value < minVal) {
      minVal = value;
      minIdx = idx;
    }
  });

  return minIdx;
};

const argmax = (values: number[]) => {
  return argmin(values.map((value) => -value));
};

const pointsEqual = (coordOne: LocationData, coordTwo: LocationData) => {
  return (
    coordOne.latitude == coordTwo.latitude &&
    coordOne.longitude == coordTwo.longitude
  );
};

const distance = (coordOne: LocationData, coordTwo: LocationData) => {
  return Math.sqrt(
    Math.pow(coordOne.latitude - coordTwo.latitude, 2) +
      Math.pow(coordOne.longitude - coordTwo.longitude, 2)
  );
};

const computeObjective = (cluster: LocationData[], centroid: LocationData) =>
  cluster.reduce((acc, cur) => acc + Math.pow(distance(cur, centroid), 2), 0);

const computeCentroid = (cluster: LocationData[]): kMeansResult => {
  const { longitude, latitude } = cluster.reduce(
    (acc: LocationData, cur: LocationData) => {
      return {
        latitude: acc.latitude + cur.latitude,
        longitude: acc.longitude + cur.longitude,
      };
    }
  );

  const centroid = {
    longitude: longitude / cluster.length,
    latitude: latitude / cluster.length,
  };

  const objective = computeObjective(cluster, centroid);

  return {
    objective,
    ...centroid,
  };
};

const kMeans = (coords: LocationData[], k: number) => {
  if (k > coords.length) {
    throw new Error(
      "Error: clusters cannot be greater than number of coordinates"
    );
  }

  let centroids = coords.slice(0, k);
  const clusterPoints = new Map<number, LocationData[]>();

  while (true) {
    coords.forEach((coord, idx) => {
      const centroidDists = centroids.map((centroid) =>
        distance(coord, centroid)
      );

      const assignedCluster = argmin(centroidDists);

      if (clusterPoints.has(assignedCluster)) {
        clusterPoints.get(assignedCluster)!.push(coord);
      } else {
        clusterPoints.set(assignedCluster, [coord]);
      }
    });

    console.log("MAP", clusterPoints.size);

    let allEqual = true;
    let objectiveSum = 0;
    clusterPoints.forEach((points, key) => {
      const centroid = computeCentroid(points);

      allEqual &&= pointsEqual(centroids[key], centroid);
      centroids[key] = centroid;

      objectiveSum += centroid.objective;
    });

    if (allEqual) {
      return { objectiveSum, centroids, clusterPoints };
    }

    clusterPoints.clear();
  }
};

const clusterData = (coords: LocationData[]) => {
  const objectiveSums = [];
  const kCentroids = [];
  for (let k = 1; k <= coords.length; k++) {
    const { objectiveSum, centroids, clusterPoints } = kMeans(coords, k);
    objectiveSums.push(objectiveSum);
    kCentroids.push({ centroids, clusterPoints });
  }

  let prevGap = objectiveSums[0] - objectiveSums[1];
  const lossGapRatios = [];
  for (let i = 2; i < objectiveSums.length; i++) {
    const curGap = objectiveSums[i - 1] - objectiveSums[i];
    lossGapRatios.push(prevGap / curGap);

    prevGap = curGap;
  }

  return kCentroids[argmax(lossGapRatios) + 1];
};

export const HeatmapClusters = ({ coords }: HeatmapProps) => {
  const [clusters, setClusters] = useState<WeightedLatLng[]>();

  useEffect(() => {
    if (coords.length === 0) {
      return;
    }

    const data = clusterData(coords);
    console.log("DATA", data);

    const weightedData = data.centroids.map((centroid, idx) => {
      return {
        ...centroid,
        weight: (data.clusterPoints.get(idx)?.length ?? 0) * 5,
      };
    });

    setClusters(weightedData);
  }, [coords]);

  console.log("CLS", clusters);

  return <Heatmap opacity={1} points={clusters} radius={100} />;
};
