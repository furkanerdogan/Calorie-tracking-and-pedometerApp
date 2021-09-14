import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

interface HealthStatProps {
    doubleIcon?: boolean;
    iconBackgroundColor: string;
    iconColor: string;
    actual: string;
    over: string;
    type: string;
}

const FitHealthStat = (props: HealthStatProps) => {
    const {
        doubleIcon,
        iconBackgroundColor,
        iconColor,
        actual,
        over,
        type,
    } = props;
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
            }}
        >
            <View
                style={{
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: iconBackgroundColor,
                    marginRight: 10,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Icon name="md-water" size={30} />

                    {doubleIcon && (
                        <Icon name="md-water" size={30} />

                    )}
                </View>
            </View>
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <Text style={{ color: "#e9eaee", fontSize: 30, fontWeight: "600" }}>
                        {actual}
                    </Text>
                    <Text style={{ color: "#9a9ba1", fontSize: 20 }}>{over}</Text>
                </View>
                <Text style={{ color: "#9a9ba1", fontSize: 15 }}>{type}</Text>
            </View>
        </View>
    );
};

export { FitHealthStat };