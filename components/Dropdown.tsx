import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Dropdown = () => {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded(!expanded), []);
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <Text>Sign Up As:</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <View style={styles.view}>
          <FlatList
            data={[
              { value: "Chef", label: "ch" },
              { value: "Customer", label: "cm" },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} style={styles.viewItem}>
                <Text>{item.value}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 53,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    maxHeight: 80,
  },
  viewItem: {
    height: 45,
    justifyContent: "center",
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
export default Dropdown;
