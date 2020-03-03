import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }

});
const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;

const SubHeading = styled.Text`
  margin: 10px;
  font-size: 15px;
  font-family: 'Helvetica';
`;

// Create Document Component
export const MyDocument = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
            <View>
                <Text>
                    <Heading>ABC Company</Heading>
                </Text>
                <Text>
                    <SubHeading>136 Albert St, Melbourne</SubHeading>
                </Text>
                </View>
                <View style={styles.section}>
                    <Text>Earnings</Text>
                </View>
                <View style={styles.section}>
                    <Text>Deductions</Text>
                </View>
            </Page>
        </Document>
    )
}