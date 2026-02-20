import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable  } from 'react-native';
import { useState, useRef } from 'react';

// npm installs
import countryList from 'country-list';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneInput from 'react-native-phone-number-input';


export default function App() {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  // Dropdown state (no entiendo mucho pero investigue :<)
  const [open, setOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [items, setItems] = useState(
      countryList.getData().map(country => ({
        label: country.name,
        value: country.code
      }))
    );

  // phone number state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);

  const [Age, setAge] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function ValidateAge(age) {
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 130) {
      return false;
    }
    return true;
  }
  const isAgeInvalid = Age !== '' && !ValidateAge(Age);

  function ValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const isEmailInvalid = email !== '' && !ValidateEmail(email);

  function getPasswordErrors(password) {
      const errors = [];
      
      // If they haven't started typing yet, don't yell at them!
      if (!password) return errors; 

      // Check each rule one by one
      if (password.length < 8) errors.push("At least 8 characters");
      if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter");
      if (!/\d/.test(password)) errors.push("1 number");
      if (!/[^a-zA-Z0-9]/.test(password)) errors.push("1 special character");

      return errors;
    }
    // Get the list of specific errors (will be empty if password is perfect)
    const passwordErrors = getPasswordErrors(password);
    
    // It's invalid if they started typing AND there are still errors
    const isPasswordInvalid = password !== '' && passwordErrors.length > 0;

  const handleSubmit = () => {
    if (!firstName || !lastName || !gender || !selectedCountryCode || !Age || !phoneNumber || !email || !password) {
      alert('Please fill in all fields before submitting.');
      if (!firstName) {
        alert('First Name is required.');
      }
      if (!lastName) {
        alert('Last Name is required.');
      }
      if (!gender) {
        alert('Gender is required.');
      }
      if (!selectedCountryCode) {
        alert('Country selection is required.');
      }
      if (!Age) {
        alert('Age is required.');
      }
      if (!phoneNumber) {
        alert('Phone Number is required.');
      }
      if (!email) {
        alert('Email is required.');
      }
      if (!password) {
        alert('Password is required.');
      }
      return;
    }
    else {
      if (!ValidateAge(Age)) {
        alert('Please enter a valid age (18-130).');
        return;
      }
      if (!ValidateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (passwordErrors.length > 0) {
        alert(`Please fix the following password errors:\n${passwordErrors.join('\n')}`);
        return;
      }
    }
    alert('Form submitted successfully!');
    setFirstName('');
    setLastName('');
    setGender('');
    setSelectedCountryCode(null); // Dropdown uses null when empty
    setAge('');
    setPhoneNumber('');           // Reset phone number text
    setFormattedValue('');        // Reset phone number formatted text
    setEmail('');
    setPassword('');
  };

  // console.log("First Name:", firstName);
  // console.log("Last Name:", lastName);
  // console.log("Gender:", gender);
  // console.log("Selected Country Code:", selectedCountryCode);
  // console.log("Age:", Age);
  // console.log("Phone Number:", phoneNumber);
  // console.log("Email:", email);
  
  return (
    <SafeAreaProvider >
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={styles.container}>
          <View style={styles.TitleContainer}>      
            <Text style={styles.title}>Sign-Up Form</Text>
          </View>
          <ScrollView style={styles.FormMasterContainer}>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
              />
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastName}
              />
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Gender</Text>
              <RadioButton.Group onValueChange={value => setGender(value)} value={gender} style={styles.radioButtonGroup}>
                <View style={styles.radioItem}>
                  <RadioButton value="Male" />
                  <Text>Male</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="Female" />
                  <Text>Female</Text>
                </View>
              </RadioButton.Group>
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Country</Text>
              <DropDownPicker
              open={open}
              value={selectedCountryCode}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedCountryCode}
              setItems={setItems}
              listMode="MODAL"
              
              // UI Customization
              placeholder="Select a country"
              searchable={true}
              searchPlaceholder="Type to search..."
              
              // Styling
              style={styles.dropdown}
              zIndex={1000} // Required so the dropdown renders over other elements
              />
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                // Use an array to apply the error style conditionally
                style={[styles.input, isAgeInvalid && styles.inputError]}
                keyboardType="numeric"
                onChangeText={text => setAge(text)}
                value={Age}
              />
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.FormContainer}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="US" // Default country
                  layout="first"
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text); // This gives you the full string, e.g., "+1234567890"
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />
              </View>
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, isEmailInvalid && styles.inputError]} // Apply error style if email is invalid
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View style={styles.FormContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, isPasswordInvalid && styles.inputError]}
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
              />
              {passwordErrors.map((error, index) => (
                <Text key={index} style={styles.errorText}>
                  • Missing: {error}
                </Text>
              ))}
            </View>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1f1', // Unified background color
  },
  TitleContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  FormMasterContainer: {
    flex: 1,
    paddingHorizontal: 20, // Keeps everything away from the phone screen edges
  },
  FormContainer: {
    marginTop: 15, 
    flexDirection: 'column', // IMPORTANT: Stacks the label ABOVE the input
  },
  label: { 
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    height: 50, // Taller inputs for easier tapping
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Modern rounded corners
    paddingHorizontal: 15,
    fontSize: 16, 
  },
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  radioItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  // Added specific styles to control the PhoneInput component
  phoneContainer: {
    width: '100%', 
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden', 
  },
  phoneTextContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 0,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40, // Gives scrolling space at the very bottom
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputError: {
    backgroundColor: '#ffe6e6', // Light red background
    borderColor: '#ff0000',     // Red border
    borderWidth: 1,
  },
  passwordRequirements: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
