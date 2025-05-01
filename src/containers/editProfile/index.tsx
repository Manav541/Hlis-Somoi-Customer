import React, { useLayoutEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EditProfileComponent from "../../components/editProfile";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { Text } from "@react-navigation/elements";
import { styles } from "./styles";

const EditProfileContainer = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState();
  const [userName, setUserName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>
          {getTranslation('editProfile')} 
        </Text>
      ),
    });
  }, [navigation]);

  
  return (
    <EditProfileComponent/>
  );
};

export default EditProfileContainer;
