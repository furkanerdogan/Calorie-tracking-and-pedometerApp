import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface AdditionalStatsProps {
    name: string;
    description: string;
}

const AdditionalStats = (props: AdditionalStatsProps) => {
    const { name, description } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View>
                <Text
                    style={{
                        color: "#e6e7ec",
                        fontSize: 20,
                        fontWeight: "500",
                        marginBottom: 5,
                    }}
                >
                    {name}
                </Text>
                <Text style={{ color: "#9a9ba1", fontSize: 15, marginBottom: 20 }}>
                    {description}
                </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Icon name="md-water" size={30} />

            </View>
        </View>
    )
}

export { AdditionalStats };