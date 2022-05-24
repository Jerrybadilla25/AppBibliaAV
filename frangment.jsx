<View style={{ marginBottom: 70, marginTop: 20 }}>
        <View style={{ paddingHorizontal: 50, paddingBottom: 40 }}>
          <Text style={{ color: colors.text }}>
            Honra a Jehová con tus bienes, Y con las primicias de todos tus
            frutos; Y serán llenos tus graneros con abundancia, Y tus lagares
            rebosarán de mosto.
          </Text>
          <Text
            style={{ color: colors.text, marginTop: 15, textAlign: "center" }}
          >
            Proverbios 3: 9-10
          </Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={[styles.dona]}>¡ Colabora con Biblia AV !</Text>
        </TouchableOpacity>
</View>

/*

{
  modalVisible ? 
  :
  
}


*/