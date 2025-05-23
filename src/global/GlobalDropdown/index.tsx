import { View, Text, Image } from 'react-native'
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { styles } from './styles';

interface CategoryDropdownProps {
    open: boolean;
    value: string | null;
    items: any[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<string>>
    setItems: any;
    placeholder: string;
    disabled?: boolean;
    zIndex?: number;
  }

  const GlobalDropdown = React.memo(
    ({
      open,
      value,
      items,
      setOpen,
      setValue,
      setItems,
      placeholder = "Select",
      disabled=false,
      zIndex
    }: CategoryDropdownProps) => {
      const dropdownStyle = React.useMemo(
        () => ({
          ...styles.btnDropdownCategories,
          borderTopLeftRadius: open ? 20 : 100,
          borderTopRightRadius: open ? 20 : 100,
        }),
        [open]
      );
  
      return (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={placeholder}
          style={dropdownStyle}
          textStyle={styles.lblDropdownCategories}
          disabled={disabled}
          dropDownContainerStyle={{
            borderColor: colors.greya7,
            backgroundColor: colors.blue4e,
            borderWidth: 1,
            marginTop: 4,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          zIndex={zIndex}
          showArrowIcon={true}
          listMode="SCROLLVIEW"
          dropDownDirection="AUTO"
          itemSeparator
          itemSeparatorStyle={{
            backgroundColor: colors.greya7,
            height: 1,
          }}
          ArrowDownIconComponent={() => (
            <Image style={styles.imgCheckBox} source={images.dropdown} />
          )}
          ArrowUpIconComponent={() => (
            <Image
              style={{ ...styles.imgCheckBox, transform: [{ rotate: "180deg" }] }}
              source={images.dropdown}
            />
          )}
        />
      );
    }
  );
  
  export default GlobalDropdown;