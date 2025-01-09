import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { BotMemoryBoxType } from '@/types'
import { SimpleLineIcons } from '@expo/vector-icons'

type BotMemoryBoxProps = {
  botMemoryBox: BotMemoryBoxType,
  onDelete: (botMemoryId: string) => void,
  showMemoryInFull: () => void,
}

const BotMemoryBox = ({ botMemoryBox, onDelete, showMemoryInFull }: BotMemoryBoxProps) => {
  const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
  const styles = getStyles(appearanceMode)

  return (
    <TouchableOpacity onPress={showMemoryInFull} style={styles.container}>
      <TouchableOpacity style={styles.deleteButton}>
                <SimpleLineIcons 
                    name='minus' 
                    size={24} 
                    color={'#EB001B'}
                    onPress={() => onDelete(botMemoryBox.botMemoryId)}
                />    
      </TouchableOpacity>
      <Text numberOfLines={5} style={styles.summary}>{botMemoryBox.summary}</Text>
    </TouchableOpacity>
  )
}

export default BotMemoryBox;
