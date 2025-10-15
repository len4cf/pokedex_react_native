import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { RootStackParamList } from "../types";


const Stack = createNativeStackNavigator<RootStackParamList>();


export function RootNavigator() {
return (
<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Pokédex" }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Detalhes" }} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favoritos" }} />
    </Stack.Navigator>
</NavigationContainer>
);
}