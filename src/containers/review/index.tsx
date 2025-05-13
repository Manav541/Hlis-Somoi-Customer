// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { images } from '../../constants/Images';

// const ReviewContainer = () => {
//   const ratings = [
//     { stars: 5, percentage: 60 },
//     { stars: 4, percentage: 34 },
//     { stars: 3, percentage: 20 },
//     { stars: 2, percentage: 10 },
//     { stars: 1, percentage: 0 },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Average Rating Section */}
//       <View style={styles.averageContainer}>
//         <Text style={styles.averageRating}>4.5</Text>
//         <View style={styles.starContainer}>
//           {[...Array(5)].map((_, index) => (
//             <Image
//               key={index}
//               source={images.star}
//               style={{height : 15,width : 15}}
//             />
//           ))}
//         </View>
//         <Text style={styles.reviewCount}>1.5K reviews</Text>
//       </View>

//       {/* Rating Breakdown Bars */}
//       <View style={styles.breakdownContainer}>
//         {ratings.map((rating, index) => (
//           <View key={index} style={styles.ratingRow}>
//             <View style={styles.stars}>
//               {[...Array(rating.stars)].map((_, i) => (
//                 <Image
//                 key={index}
//                 source={images.star}
//                 style={{height : 15,width : 15}}
//               />
//               ))}
//             </View>
//             <View style={styles.barContainer}>
//               <View
//                 style={[styles.bar, { width: `${rating.percentage}%`, backgroundColor: '#FFA500' }]}
//               />
//               <View
//                 style={[styles.bar, { width: `${100 - rating.percentage}%`, backgroundColor: '#D3D3D3' }]}
//               />
//             </View>
//             <Text style={styles.percentage}>{rating.percentage}%</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#1A2A44', // Dark blue background
//     borderRadius: 8,
//   },
//   averageContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   averageRating: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   starContainer: {
//     flexDirection: 'row',
//     marginVertical: 4,
//   },
//   reviewCount: {
//     fontSize: 14,
//     color: '#FFFFFF',
//   },
//   breakdownContainer: {
//     marginTop: 8,
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   stars: {
//     flexDirection: 'row',
//     width: 80,
//   },
//   barContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     height: 8,
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginHorizontal: 8,
//   },
//   bar: {
//     height: '100%',
//   },
//   percentage: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     width: 40,
//     textAlign: 'right',
//   },
// });

// export default ReviewContainer;

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ReviewComponent from "../../components/review";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";

const ReviewContainer = ({ navigation }: any) => {
  const totalRate = 4.5;
  const totalReviews = "1.5k";
  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
    });
  };

  const [arrRateProgress, setArrRateProgress] = useState([
    {
      rate_number: 5,
      rate_percentage: 60,
    },
    {
      rate_number: 4,
      rate_percentage: 34,
    },
    {
      rate_number: 3,
      rate_percentage: 20,
    },
    {
      rate_number: 2,
      rate_percentage: 10,
    },
    {
      rate_number: 1,
      rate_percentage: 0,
    },
  ]);

  const [arrRevieews,setArrReviews] = useState([
    {
      review_personName : 'Jesus Loy',
      review_rate : '4.5',
      review_date: '12 Oct 2023',
      review_description : 'Material is best but the overall look is too gud 😍 Test very good',
      review_image: images.rice,
      type: 'image'
    },
    {
      review_personName : 'Mike loy',
      review_rate : '4.5',
      review_date: '12 Oct 2023',
      review_description : 'It is a long established fact that a reader will be distracted by the readable',
      review_image: images.rice,
      type: 'video'
    },
  ])

  useEffect(() => {
    header();
  }, []);
  return (
    <ReviewComponent
      totalRate={totalRate}
      totalReviews={totalReviews}
      arrRateProgress={arrRateProgress}
      arrRevieews={arrRevieews}
    />
  );
};

export default ReviewContainer;
