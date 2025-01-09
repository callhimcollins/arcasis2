import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const EULA = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>End User License Agreement</Text>

                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='close' color={'black'} size={28}/>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>1. Acceptance of Terms</Text>
                    <Text style={styles.content}>By using Arcasis, you confirm that you are at least 18 years old or have obtained parental consent to use our services. These Terms constitute a binding agreement between you and Arcasis.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>2. Services Provided</Text>
                    <Text style={styles.content}>Arcasis is an e-commerce platform that allows users to purchase or subscribe to curated product bundles, with features such as personalized gifting and custom recommendations. Specific terms for certain features or promotions may apply and will be communicated to you..</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>3. Account Registration</Text>
                    <Text style={styles.content}>You must create an account to access certain features of Arcasis.{'\n'}{'\n'}

                    You are responsible for maintaining the confidentiality of your account credentials.{'\n'}{'\n'}

                    You agree to provide accurate and up-to-date information when registering.{'\n'}{'\n'}

                    We reserve the right to suspend or terminate accounts at our discretion, including but not limited to cases of suspected fraud or misuse.
                </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>4. Payments</Text>
                    <Text style={styles.content}>Payments for products must be made through the payment methods available on the platform.{'\n'}{'\n'}

All prices are listed in "$" and include applicable taxes unless otherwise stated.{'\n'}{'\n'}

Additional fees, such as delivery charges, may apply and will be clearly communicated during checkout.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>5. User Conduct</Text>
                    <Text style={styles.content}>By using Arcasis, you agree to:{'\n'}{'\n'}

                                        Use the platform only for lawful purposes.{'\n'}{'\n'}

                                        Not misuse the platform by attempting to gain unauthorized access or introducing malicious software.{'\n'}{'\n'}

                                        Respect the privacy and rights of other users.
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>6. Delivery and Returns</Text>
                    <Text style={styles.content}>Delivery times are estimates and may vary based on your location and circumstances.{'\n'}{'\n'}

                    Returns and exchanges are subject to our Return Policy, available on the platform.{'\n'}{'\n'}

                    Arcasis is not responsible for delivery delays caused by external factors beyond our control, such as weather or carrier issues.
                </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>7. Gifting Features</Text>
                    <Text style={styles.content}>Personal messages, whether text or video, are mandatory with each gift and must comply with our Content Guidelines.{'\n'}{'\n'}

                        Users are responsible for ensuring the accuracy of the recipient’s address and other details.{'\n'}{'\n'}

                        Arcasis reserves the right to reject or edit inappropriate content submitted with gifts.
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>8. Intellectual Property</Text>
                    <Text style={styles.content}>All content on Arcasis, including but not limited to text, graphics, logos, and software, is the property of Arcasis or its licensors and is protected by copyright and trademark laws.{'\n'}{'\n'}

You may not use, copy, or distribute any content from Arcasis without our explicit permission.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>9. Disclaimer of Warranties</Text>
                    <Text style={styles.content}>Arcasis is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted or error-free service.{'\n'}{'\n'}

We disclaim all warranties, express or implied, including but not limited to fitness for a particular purpose or non-infringement..</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>10. Limitation of Liability</Text>
                    <Text style={styles.content}>To the extent permitted by law, Arcasis and its affiliates will not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.{'\n'}{'\n'}

Our total liability to you for any claim arising out of or related to your use of the platform will not exceed the amount you paid to Arcasis in the 12 months preceding the claim.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>11. Privacy Policy</Text>
                    <Text style={styles.content}>Our Privacy Policy explains how we collect, use, and protect your personal information. By using Arcasis, you consent to our data practices as outlined in the Privacy Policy.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>12. Changes to Terms</Text>
                    <Text style={styles.content}>We reserve the right to modify these Terms at any time. Changes will be effective upon posting on the platform. Continued use of Arcasis after changes signifies your acceptance of the updated Terms.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>13. Governing Law</Text>
                    <Text style={styles.content}>These Terms are governed by and construed in accordance with the laws of Louisiana. Any disputes will be resolved exclusively in the courts of Louisiana.</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>14. Contact Us</Text>
                    <Text style={styles.content}>If you have any questions about these Terms, please contact us at:{'\n'}{'\n'}

                    Email: arcasisco@gmail.com{'\n'}{'\n'}
                    Phone: +1 (985) 215-2633{'\n'}{'\n'}
</Text>
                </View>
                <Text style={{ marginTop: 20, padding: 5, textAlign: 'center', marginBottom: 35, color: appearanceMode.textColor, fontFamily: 'sorabold' }}>By using Arcasis, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</Text>
            </ScrollView>
        </View>
    )
}

export default EULA

