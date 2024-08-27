import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import CustomText from "@/components/CustomText";

const screenWidth = Dimensions.get("window").width - 80;

const BarChartComponent = ({ data, labels }) => {
  return (
    <>
      <CustomText
        type="primary"
        variant="titleLarge"
        content="Money Spent on Fuel"
        style={styles.chartTitle}
      />
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={styles.chart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BarChartComponent;
