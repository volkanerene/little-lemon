import { Text, View, StyleSheet, Image } from "react-native";

const MenuItem = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
    <Image
      style={styles.itemImage}
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#495e57",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 20,
    color: "#000000",
    paddingBottom: 5,
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    color: "#495e57",
    paddingTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

export default MenuItem;
