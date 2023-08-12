import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import useFetch from "../../../hook/useFetch";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "Python developer in Texas, USA",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data.data}
            renderItem={({ item }) => (
              <NearbyJobCard
                item={item}
                handleCardPress={() =>
                  router.push(`/job-details/${item.job_id}`)
                }
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ rowGap: SIZES.small }}
          />
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
