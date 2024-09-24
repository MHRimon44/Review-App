import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import styles from "./Style";

export default function App() {
  const [reviews, setReviews] = useState([]);

  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isQuestionModalVisible, setQuestionModalVisible] = useState(false);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false); // New state for search modal
  const [selectedClass, setSelectedClass] = useState("any");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airline, setAirline] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [questionMessage, setQuestionMessage] = useState("");

  const [searchDeparture, setSearchDeparture] = useState(""); // Search field states
  const [searchArrival, setSearchArrival] = useState("");
  const [searchAirline, setSearchAirline] = useState("");
  const [searchClass, setSearchClass] = useState("any");
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const toggleShareModal = () => {
    setShareModalVisible(!isShareModalVisible);
  };

  const toggleQuestionModal = () => {
    setQuestionModalVisible(!isQuestionModalVisible);
  };

  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };

  // Open Image Picker
  const pickImage = async (setImageFunction) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFunction(result.uri);
    }
  };

  // Handle Share Submit
  const handleShareSubmit = () => {
    if (departureAirport && arrivalAirport && airline && selectedClass) {
      const newReview = {
        id: Math.random().toString(),
        airline: airline,
        class: selectedClass,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        rating: rating,
        content: `Airline: ${airline}, Class: ${selectedClass}, Rating: ${rating}/5\nFrom ${departureAirport} to ${arrivalAirport}`,
        image: image,
        type: "review", // Mark as a review
      };

      setReviews((prevReviews) => [...prevReviews, newReview]);
      setFilteredReviews((prevReviews) => [...prevReviews, newReview]); // Update filtered reviews
      resetShareForm(); // Reset the form
      toggleShareModal(); // Close modal
    } else {
      console.log("Please fill in all fields");
    }
  };
  const newReview = {
    id: Math.random().toString(),
    airline: airline,
    class: selectedClass,
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    rating: rating,
    content: `Airline: ${airline}, Class: ${selectedClass}, Rating: ${rating}/5\nFrom ${departureAirport} to ${arrivalAirport}`,
    image: image,
  };
  const newQuestion = {
    id: Math.random().toString(),
    content: `Question: ${questionMessage}`,
    image: questionImage,
  };

  // Handle Question Submit
  const handleQuestionSubmit = () => {
    if (questionMessage) {
      const newQuestion = {
        id: Math.random().toString(),
        content: `Question: ${questionMessage}`,
        image: questionImage,
        type: "question", // Mark as a question
      };

      setReviews((prevReviews) => [...prevReviews, newQuestion]);
      setFilteredReviews((prevReviews) => [...prevReviews, newQuestion]); // Update filtered reviews
      resetQuestionForm(); // Reset the form
      toggleQuestionModal(); // Close modal
    } else {
      console.log("Please fill in all fields");
    }
  };
  // Filter reviews based on search criteria
  const handleSearchSubmit = () => {
    const filtered = reviews.filter((review) => {
      const matchesDeparture = searchDeparture
        ? review.content.includes(searchDeparture)
        : true;
      const matchesArrival = searchArrival
        ? review.content.includes(searchArrival)
        : true;
      const matchesAirline = searchAirline
        ? review.content.includes(searchAirline)
        : true;
      const matchesClass =
        searchClass !== "any" ? review.content.includes(searchClass) : true;

      return (
        matchesDeparture && matchesArrival && matchesAirline && matchesClass
      );
    });
    setFilteredReviews(filtered);
    toggleSearchModal();
  };

  // Reset Share form fields
  const resetShareForm = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setAirline("");
    setSelectedClass("any");
    setRating(0);
    setImage(null);
  };

  // Reset Question form fields
  const resetQuestionForm = () => {
    setQuestionMessage("");
    setQuestionImage(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Business & First Class Reviews</Text>
        <Ionicons
          style={{ flexDirection: "row-reverse" }}
          name="menu"
          size={38}
          color="black"
        />
      </View>

      {/* Body Section */}
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.buttonRow}>
            {/* Share your thought button */}
            <TouchableOpacity style={styles.button} onPress={toggleShareModal}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.buttonText}>Share your thought</Text>
                <FontAwesome6 name="people-line" size={15} color="white" />
              </View>
            </TouchableOpacity>

            {/* Ask a question button */}
            <TouchableOpacity
              style={styles.button}
              onPress={toggleQuestionModal}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.buttonText}>Ask a question</Text>
                <FontAwesome6
                  name="person-circle-question"
                  size={15}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Box (Non-editable, works like a button) */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={toggleSearchModal}
          >
            <View style={styles.searchbar}>
              <Ionicons name="search" size={24} color="black" />
              <Text style={styles.searchboxText}>Search for reviews...</Text>
            </View>
          </TouchableOpacity>

          {/* Airline Image */}

          <Image
            source={{
              uri: "https://www.asiamiles.com/content/dam/am-content/brand-v2/air-pillar/logo-image/qatar_airways-logo.png",
            }}
            style={styles.image}
          />

          {/* Reviews and Questions Section */}
          <Text style={styles.sectionTitle}>Reviews and Questions</Text>
          <FlatList
            data={filteredReviews}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                {/* Check if it's a review or question */}
                {item.type === "review" ? (
                  <>
                    {/* Image if available */}
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.reviewImage}
                      />
                    )}

                    {/* Airline */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>Airline: </Text>
                      {item.airline}
                    </Text>

                    {/* Class */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>Class: </Text>
                      {item.class}
                    </Text>

                    {/* Departure Airport */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>From: </Text>
                      {item.departureAirport}
                    </Text>

                    {/* Arrival Airport */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>To: </Text>
                      {item.arrivalAirport}
                    </Text>

                    {/* Rating */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>Rating: </Text>
                      {item.rating}/5
                    </Text>
                  </>
                ) : (
                  <>
                    {/* Image if available */}
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.reviewImage}
                      />
                    )}

                    {/* Question */}
                    <Text style={styles.reviewField}>
                      <Text style={styles.fieldLabel}>Question: </Text>
                      {item.content}
                    </Text>
                  </>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          {/* Modal for sharing thoughts */}
          <Modal visible={isShareModalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Share Your Experience</Text>

                <TouchableOpacity
                  onPress={() => pickImage(setImage)}
                  style={styles.imageUpload}
                >
                  <Text>Drop your image here or browse</Text>
                </TouchableOpacity>
                {image && (
                  <Image source={{ uri: image }} style={styles.selectedImage} />
                )}

                <TextInput
                  placeholder="Departure Airport"
                  value={departureAirport}
                  onChangeText={setDepartureAirport}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Arrival Airport"
                  value={arrivalAirport}
                  onChangeText={setArrivalAirport}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Airline"
                  value={airline}
                  onChangeText={setAirline}
                  style={styles.input}
                />

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedClass}
                    onValueChange={(itemValue) => setSelectedClass(itemValue)}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Business" value="business" />
                    <Picker.Item label="First" value="first" />
                    <Picker.Item
                      label="Premium Economy"
                      value="premium_economy"
                    />
                    <Picker.Item label="Economy" value="economy" />
                  </Picker>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                    >
                      <Ionicons
                        name={rating >= star ? "star" : "star-outline"}
                        size={24}
                        color="gold"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Button title="Submit" onPress={handleShareSubmit} />
                </View>
                <Button title="Close" onPress={toggleShareModal} />
              </View>
            </View>
          </Modal>

          {/* Modal for asking a question */}
          <Modal visible={isQuestionModalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Ask a Question</Text>

                <TouchableOpacity
                  onPress={() => pickImage(setQuestionImage)}
                  style={styles.imageUpload}
                >
                  <Text>Drop your image here or browse</Text>
                </TouchableOpacity>
                {questionImage && (
                  <Image
                    source={{ uri: questionImage }}
                    style={styles.selectedImage}
                  />
                )}

                <TextInput
                  placeholder="Your Question"
                  value={questionMessage}
                  onChangeText={setQuestionMessage}
                  style={styles.input}
                />
                <View style={{ marginBottom: 5 }}>
                  <Button title="Submit" onPress={handleQuestionSubmit} />
                </View>
                <Button title="Close" onPress={toggleQuestionModal} />
              </View>
            </View>
          </Modal>

          {/* Modal for search inputs */}
          <Modal visible={isSearchModalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Search Reviews</Text>

                <TextInput
                  placeholder="Departure Airport"
                  value={searchDeparture}
                  onChangeText={setSearchDeparture}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Arrival Airport"
                  value={searchArrival}
                  onChangeText={setSearchArrival}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Airline"
                  value={searchAirline}
                  onChangeText={setSearchAirline}
                  style={styles.input}
                />

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={searchClass}
                    onValueChange={(itemValue) => setSearchClass(itemValue)}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Business" value="business" />
                    <Picker.Item label="First" value="first" />
                    <Picker.Item
                      label="Premium Economy"
                      value="premium_economy"
                    />
                    <Picker.Item label="Economy" value="economy" />
                  </Picker>
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Button title="Search" onPress={handleSearchSubmit} />
                </View>
                <Button title="Close" onPress={toggleSearchModal} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}
