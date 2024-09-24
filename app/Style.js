import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FEFD",
  },
  appBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  appBarTitle: {
    fontSize: 18, // Adjust the title font size for a more compact appearance
    fontWeight: "bold",
  },
  body: {
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 10,
    // flexDirection:"row"
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    flexDirection:"row",
    borderRadius:50,
    width:"80%",
    justifyContent:"center",
    alignSelf:"center"
  },
  searchboxText:{fontSize:16},
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageUpload: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  starRatingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starRating: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },

  reviewContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow effect
  },

  reviewContent: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },

  reviewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  reviewField: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,  // Add margin between each field for separation
  },
  fieldLabel: {
    fontWeight: "bold",
    color: "#555",
  },
  reviewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default styles;
