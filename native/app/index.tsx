import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { FormHeader } from "./components/formHeader";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={{height: 100}}>
        <FormHeader
          leftHeading="Welcome"
          rightHeading="Back"
          subHeading="task manager"
        />
      </View>

      <View>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: 45,
              padding: 10,
              backgroundColor: "#1b1b33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Log in</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
  },
});
