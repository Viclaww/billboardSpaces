import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

const CreateAnAccount = () => {

    return (
        <View style={styles.createAnAccount2}>
            <View style={[styles.statusbarIphone13, styles.iconPosition]}>
                <Image style={[styles.notchIcon, styles.iconPosition]} resizeMode="cover" source="Notch.png" />
                <View style={[styles.leftSide, styles.leftSideLayout]}>
                    <View style={[styles.statusbarTime, styles.leftSideLayout]}>
                        <Text style={styles.text1}>9:41</Text>
                    </View>
                </View>
                <Image style={[styles.rightSideIcon, styles.iconPosition]} resizeMode="cover" source="Right Side.png" />
            </View>
            <Text style={styles.createAnAccount3}>Create an Account</Text>
            <Image style={styles.createAnAccountChild} resizeMode="cover" source="Vector 1.png" />
            <View style={styles.groupParent}>
                <View style={styles.rectangleLayout}>
                    <View style={[styles.groupChild, styles.groupChildShadowBox]} />
                    <Text style={[styles.email, styles.emailTypo]}>Email</Text>
                </View>
                <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
                    <View style={styles.groupShadowBox} />
                    <Text style={[styles.password, styles.emailTypo]}>Password</Text>
                    <Image style={styles.vectorIcon2} resizeMode="cover" source="Vector.png" />
                </View>
                <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
                    <View style={styles.groupShadowBox} />
                    <Text style={[styles.password, styles.emailTypo]}>Confirm Password</Text>
                    <Image style={styles.vectorIcon2} resizeMode="cover" source="Vector.png" />
                </View>
            </View>
            <View style={[styles.buttonWrapper, styles.frameViewFlexBox]}>
                <Text style={[styles.button, styles.buttonTypo]}>Sign Up</Text>
            </View>
            <View style={[styles.groupView, styles.viewPosition]}>
                <View style={[styles.rectangleView, styles.viewPosition]} />
                <View style={[styles.frameView, styles.frameViewFlexBox]}>
                    <Image style={styles.frameChild} resizeMode="cover" source="Group 19.png" />
                    <Text style={[styles.continueWithGoogle1, styles.orClr]}>Continue with Google</Text>
                </View>
            </View>
            <Text style={[styles.or, styles.orClr]}>OR</Text>
            <Pressable style={[styles.alreadyAUserContainer, styles.iconPosition]} onPress={() => { }}>
                <Text style={styles.text2}>
                    <Text style={[styles.alreadyAUser1, styles.orClr]}>{`Already a user? `}</Text>
                    <Text style={[styles.signIn, styles.buttonTypo]}>Sign in</Text>
                </Text>
            </Pressable>
        </View>);
};

const styles = StyleSheet.create({
    iconPosition: {
        left: "50%",
        position: "absolute"
    },
    leftSideLayout: {
        width: 54,
        height: 21,
        left: "50%",
        position: "absolute"
    },
    groupChildShadowBox: {
        borderStyle: "solid",
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: "rgba(204, 204, 204, 0.25)",
        top: 0
    },
    emailTypo: {
        color: "#ccc",
        fontFamily: "Inter-Regular",
        left: 16,
        textAlign: "left",
        fontSize: 12,
        top: "50%",
        position: "absolute"
    },
    rectangleLayout: {
        height: 40,
        width: 343
    },
    frameViewFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        left: "50%",
        position: "absolute"
    },
    buttonTypo: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500"
    },
    viewPosition: {
        width: 235,
        marginLeft: -117.5,
        height: 40,
        left: "50%",
        position: "absolute"
    },
    orClr: {
        color: "#383838",
        fontFamily: "Inter-Regular"
    },
    notchIcon: {
        marginLeft: -82,
        width: 164,
        height: 32,
        top: 0
    },
    text1: {
        top: 1,
        left: 0,
        fontSize: 17,
        letterSpacing: 0,
        lineHeight: 22,
        fontWeight: "600",
        fontFamily: "SF Pro Text",
        color: "#010101",
        height: 20,
        textAlign: "center",
        width: 54,
        position: "absolute"
    },
    statusbarTime: {
        marginLeft: -27,
        borderRadius: 24,
        height: 21,
        top: 0
    },
    leftSide: {
        marginLeft: -168,
        top: 14,
        height: 21
    },
    rightSideIcon: {
        marginLeft: 91,
        top: 8,
        width: 77,
        height: 24
    },
    statusbarIphone13: {
        marginLeft: -195.5,
        width: 390,
        height: 47,
        top: 0,
        overflow: "hidden"
    },
    createAnAccount3: {
        marginLeft: -124.5,
        top: 206,
        fontSize: 28,
        color: "#1e1e1e",
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        textAlign: "center",
        left: "50%",
        position: "absolute"
    },
    createAnAccountChild: {
        top: 111,
        left: 176,
        width: 48,
        height: 63,
        position: "absolute"
    },
    groupChild: {
        borderColor: "#0080fe",
        borderWidth: 1,
        backgroundColor: "#f5faff",
        borderStyle: "solid",
        borderRadius: 10,
        marginLeft: -171.5,
        height: 40,
        width: 343,
        left: "50%",
        position: "absolute"
    },
    email: {
        marginTop: -8,
        textAlign: "left"
    },
    groupShadowBox: {
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: "rgba(204, 204, 204, 0.25)",
        backgroundColor: "#f5faff",
        borderRadius: 10,
        marginLeft: -171.5,
        height: 40,
        width: 343,
        left: "50%",
        top: 0,
        position: "absolute"
    },
    password: {
        marginTop: -7,
        textAlign: "left"
    },
    vectorIcon2: {
        marginTop: -6,
        left: 307,
        width: 20,
        height: 12,
        top: "50%",
        position: "absolute"
    },
    rectangleGroup: {
        marginTop: 24
    },
    groupParent: {
        top: 383,
        left: 15,
        alignItems: "flex-end",
        position: "absolute"
    },
    button: {
        color: "#fff",
        textAlign: "left"
    },
    buttonWrapper: {
        top: 647,
        backgroundColor: "#0080fe",
        height: 48,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 10,
        marginLeft: -171.5,
        alignItems: "center",
        flexDirection: "row",
        width: 343
    },
    rectangleView: {
        borderRadius: 7,
        borderColor: "#ccc",
        borderWidth: 0.3,
        borderStyle: "solid",
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: "rgba(204, 204, 204, 0.25)",
        top: 0,
        backgroundColor: "#fff"
    },
    frameChild: {
        width: 24,
        height: 24
    },
    continueWithGoogle1: {
        fontSize: 16,
        marginLeft: 16,
        textAlign: "left"
    },
    frameView: {
        marginTop: -11.07,
        marginLeft: -96.5,
        top: "50%",
        height: 21
    },
    groupView: {
        top: 264
    },
    or: {
        marginLeft: -8.5,
        top: 336,
        textAlign: "left",
        fontSize: 12,
        color: "#383838",
        left: "50%",
        position: "absolute"
    },
    alreadyAUser1: {
        fontSize: 12,
        color: "#383838"
    },
    signIn: {
        color: "#0080fe"
    },
    text2: {
        marginLeft: -67.5,
        textAlign: "left"
    },
    alreadyAUserContainer: {
        top: 719
    },
    createAnAccount2: {
        flex: 1,
        width: "100%",
        height: 812,
        overflow: "hidden",
        backgroundColor: "#fff"
    }
});

export default CreateAnAccount;
