import { View, Text, StyleSheet } from "react-native";



export const FormHeader = ({leftHeading , rightHeading, subHeading}: any) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{leftHeading} </Text>
        <Text style={styles.header}>{rightHeading}</Text>
      </View>
      <Text style={styles.subheader}>{subHeading}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1b1b33",
  },
  subheader: {
    fontSize: 18,
    color: "#1b1b33",
    textAlign: "center",
  },
});
