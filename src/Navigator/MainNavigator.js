import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/User/HomeScreen';
import LessonScreen from '../Screen/User/LessonScreen';
import QuizScreen from '../Screen/User/QuizScreen';
import QuizResultScreen from '../Screen/User/QuizResultScreen';
import TopicScreen from '../Screen/User/TopicScreen';
import ProfileScreen from '../Screen/User/ProfileScreen';
import ProgressScreen from '../Screen/User/ProgressScreen';
import RankingScreen from '../Screen/User/RankingScreen';
import SettingsScreen from '../Screen/User/SettingsScreen';
import StudyCalendarScreen from '../Screen/User/StudyCalendarScreen';
import NotificationScreen from '../Screen/User/NotificationScreen';
import FeedbackScreen from '../Screen/User/FeedbackScreen';
import ErrorReportScreen from '../Screen/User/ErrorReportScreen';
import LoginScreen from '../Screen/Auth/LoginScreen';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Lesson" component={LessonScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="QuizResult" component={QuizResultScreen} />
    <Stack.Screen name="Topic" component={TopicScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Progress" component={ProgressScreen} />
    <Stack.Screen name="Ranking" component={RankingScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="StudyCalendar" component={StudyCalendarScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
    <Stack.Screen name="ErrorReport" component={ErrorReportScreen} />

    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
  
)};

export default MainNavigator;
