import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useUser } from '../../hooks/useContextUserId';
import { globalStyles } from '../../styles/global';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory-native';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native'; 

export function Dashboard() {
    const {ip, userId, token, reqConfig, username} = useUser();
    const [metrics, setMetrics] = useState([]);
    const [summaries, setSummaries] = useState();
    const [decks, setDecks] = useState();
    const [reviews, setReviews] = useState([]);
    const [percent, setPercent] = useState();
    const [isGrow, setIsGrow] = useState();

    const barData = {
        labels:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets:[
            {
              data: reviews
            }
        ]
    }

    const bardData2 = [
        {x: 'Sun', y: reviews[0] || 0},
        {x: 'Mon', y: reviews[1] || 0},
        {x: 'Tue', y: reviews[2] || 0},
        {x: 'Wed', y: reviews[3] || 0},
        {x: 'Thu', y: reviews[4] || 0},
        {x: 'Fri', y: reviews[5] || 0},
        {x: 'Sat', y: reviews[6] || 0},
    ]

    const chartConfig = {
        labelColor: () => '#024959',
        barPercentage: 0.5,
        decimalPlaces: 0,
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: () => `#024959`,
    };


    useFocusEffect(
        React.useCallback(() => {
            getMetrics();
        }, [])
    );
    useEffect(()=>{
        countSummaries();
        countDecks();
    },[metrics]);

    const getMetrics = async () => {
       try {
         const response = await axios.get(
             `${ip}/user/metrics/${username}`,
             reqConfig
         );
 
         setMetrics(response.data.user.metrics);
         setPercent(response.data.metricsInfo.percent);
         setIsGrow(response.data.metricsInfo.isGrowth);
         metrics.sort((a,b) => new Date(a.metrics_date) - new Date(b.metrics_date));

         let reviewsList = [0,0,0,0,0,0,0];
         metrics.forEach(x => {
            const date = new Date(x.metrics_date);
            const day = date.getDay();

            reviewsList[day] = x.reviews;
         });

         setReviews(reviewsList);
       } catch (error) {
         Toast.show({
            type: 'error',
            text1: `${error}`
         });
       }
    }

    const countSummaries = () =>{
        const sum = metrics.reduce((acc, current) => {
            return acc + current.summaries_reviews;
        }, 0);
        setSummaries(sum);
    }

    const countDecks = () =>{
        const sum = metrics.reduce((acc, current) => {
            return acc + current.decks_reviews;
        }, 0);
        setDecks(sum);
    }


    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.tittlePage}>Dashboard</Text>
            </View>
           <ScrollView>
                <View>
                    <Text style={{fontSize:22, marginLeft: 5}}>Welcome, {username}!</Text>
                </View>
                <View style={styles.pieContainer}>
                    <Text style={{fontSize: 18}}>You studied {Math.round(percent) || 100}% {isGrow ? 'more': 'less'} than last week!</Text>
                    {/* <BarChart
                        data={barData}
                        chartConfig={chartConfig}
                        width={300}
                        height={200}
                        showBarTops={false} // Remove the top of the bars
                        showValuesOnTopOfBars={true} // Show values on top of the bars
                        fromZero={true}


                    /> */}
                    <VictoryChart
                        width={350}
                    >
                        <VictoryBar 
                            data={bardData2}
                            style={{data: {fill: "#024959"}}}
                        />
                    </VictoryChart>
                </View>
                <View style={styles.pieContainer}>
                    <Text style={{fontSize: 18}}>Most used resources:</Text>
                    <VictoryPie 
                        data={
                            [
                                {x: summaries > 0 ?  "Summaries": " ", y: summaries || 0},
                                {x: decks > 0 ? "Decks": " ", y: decks || 0}
                            ]
                        }
                        colorScale={['#024959','#A7C6D9']}
                        labelRadius={({ innerRadius }) => innerRadius + 5 }
                        innerRadius={50}
                        width={350}
                        style={{labels: { fill:"white"}}}
                        
                    /> 
                </View>
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pieContainer:{
        top:10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
});