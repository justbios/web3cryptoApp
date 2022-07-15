import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  async saveItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error);
    }
  },
  async getItem(key: string) {
    let item = null;

    try {
      item = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error);
      item = null;
    }

    return item;
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error);
    }
  },
};

export default deviceStorage;
