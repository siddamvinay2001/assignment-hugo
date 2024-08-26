import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import CustomText from "@/components/CustomText";

const screenWidth = Dimensions.get("window").width - 80;

const LineChartComponent = ({ data, labels }) => {
  return (
    <>
      <CustomText
        type="primary"
        variant="titleLarge"
        content="Mileage"
        style={styles.chartTitle}
      />
      <LineChart
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
        yAxisSuffix=" km"
        chartConfig={{
          backgroundColor: "#022173",
          backgroundGradientFrom: "#1e3c72",
          backgroundGradientTo: "#2a5298",
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
        bezier
        style={styles.chart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: 32,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default LineChartComponent;
