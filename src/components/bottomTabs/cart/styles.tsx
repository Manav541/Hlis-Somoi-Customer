import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
  },
  vwMainEmpty: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent:'center',
    alignItems : 'center',
    
  },

  vwMainContent: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  vwOfferDetail:{
    height : 44,
    backgroundColor : colors.white,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    gap : 5
  },
  vwApplyCouponCode: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    gap: 5.32,
  },
  vwCoponCodeInputApplyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 63,
    marginTop: 11,
    gap: 10,
  },
  vwCoponCodeInputApply: {
    flex: 1,
    backgroundColor: colors.whiteff,
    borderRadius: 100,
    paddingHorizontal: 10,
    height: 34,
    justifyContent: "center",
  },
  vwRemoveCode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 14,
    height: 46,
    marginHorizontal: 20,
  },
  vwApplidCouponCodeDesc: {
    justifyContent: "space-between",
    height: 46,
  },
  vwArrOrderProducts: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  vwOrderProductItem: {
    height: 86,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  vwProductImage: {
    height: 86,
    width: 69,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
  },
  vwOrderProductItemDetail: {
    marginLeft: 10,
    marginVertical: 9,
    flex: 1,
    justifyContent : 'space-between'
  },
  vwProductPriceWeight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop : 5
  },
  vwProductQuantity:{
    height : 28,
    width : 74,
    borderRadius : 6,
    backgroundColor : colors.whiteff,
    justifyContent : 'space-between',
    alignItems : 'center',
    flexDirection : 'row',
    gap : 5,
    marginHorizontal : 9,
    marginBottom : 9,
    alignSelf : 'flex-end',
    paddingHorizontal : 2
  },
  vwDelivertoChange:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    height:20,
    gap : 20,
    marginHorizontal : 20,
    marginTop : 20,
    marginBottom : 7
  },
  vwOrderDetails:{
    marginHorizontal : 20,
    gap : 15
  },
  vwOrderDetailsItemMain:{
    gap : 11,
  },
  vwOrderDetailsItem:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent :'space-between',
    height:18,
  },
  vwLine:{
    height : 1,
    backgroundColor : colors.grey62,
  },
  vwTotal:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent :'space-between',
    height:25
  },
  vwPlaceOrder:{
    marginHorizontal : 20,
    marginTop : 35,
    marginBottom : 29
  },

  // Text Styles
  lblOfferDetails:{
    fontSize : fontSize.size12,
    fontFamily : fontsfamily.regular,
    color : colors.black35,
  },
  lbkApplyCouponCode: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    color: colors.white,
  },
  lblApply: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    color: colors.blue4e,
  },
  lblAppliedCouponCodeTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    color: colors.green86,
  },
  lblAppliedCouponCodeDec: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
    color: colors.white,
  },
  lblRemove: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    color: colors.red2e,
  },
  lblProductName: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    color: colors.black35,
  },
  lblProductWeight: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
    color: colors.greya7,
  },
  lblProductPrice: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    color: colors.blue4e,
  },
  lblProductQuantity: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    color: colors.blue4e,
    width : 16,
    textAlign : 'center',
    height : 16
  },
  lblDeliverToName :{
    fontSize : fontSize.size16,
    fontFamily : fontsfamily.bold,
    color : colors.white
  },
  lblChange :{
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.semibold,
    color : colors.orange1c
  },
  lblDeliverToAddress :{
    fontSize : fontSize.size12,
    fontFamily : fontsfamily.medium,
    color : colors.whiteff,
    marginHorizontal : 20,
    lineHeight : 16,
    marginBottom : 20
  },
  lblOrderDetails:{
    fontSize : fontSize.size16,
    fontFamily : fontsfamily.semibold,
    color : colors.white
  },
  lblOrderDetailsTitle:{
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.medium,
    color : colors.whiteff,
  },
  lblOrderDetailsValue:{
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.semibold,
    color : colors.whiteff
  },
  lblTotal :{
    fontSize : fontSize.size20,
    fontFamily : fontsfamily.bold,
    color : colors.white
  },
  lblEmptyCart :{
    fontSize : fontSize.size20,
    fontFamily : fontsfamily.bold,
    color : colors.white
  },

  // Image Styles
  imgApplyCouponCode: {
    width: 15.35,
    height: 16,
  },
  imgBlueDot :{
    height : 4,
    width : 4
  },
  imgPlusMinus :{
    height : 24,
    width : 24
  },
  imgTickCircle:{
    height : 16,
    width : 16
  },

  // Touchable Opacity Styles
  btnApplyCouponCode: {
    width: 95,
    height: 34,
    borderRadius: 100,
    backgroundColor: colors.orange1c,
    alignItems: "center",
    justifyContent: "center",
  },
  btnRemove: {
    width: 95,
    height: 34,
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  // Text Input Styles
  txtInputCouponCode: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: colors.blue4e,
    padding : 0,
    margin : 0,
  },
});
