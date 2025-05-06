import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { activityOpacity, hitSlop } from '../../constants/GConstant'
import { images } from '../../constants/Images'
import { getTranslation } from '../../localization/i18n/i18n.config'

interface PropsType {
  arrCards : any[];
  handleOnPressAddCard : () => void;
}

const ManagePaymentMethodsComponent = (props : PropsType) => {
  const renderArrCards = ({item ,index }: any) => {
    return (
      <View style={styles.vwCardDetail}></View>
    )
    
  }
  return (
    <View style={styles.vwMain}>
      <TouchableOpacity
        style={styles.btnAddCard}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={props?.handleOnPressAddCard}
      >
        <Image style={styles.imgAdd} source={images.add} />
        <Text style={styles.lblAddNewCard}>
          {getTranslation("addNewCard")}
        </Text>
      </TouchableOpacity>
      <FlatList 
      data={props?.arrCards}
      bounces={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderArrCards}/>
    </View>
  )
}

export default ManagePaymentMethodsComponent