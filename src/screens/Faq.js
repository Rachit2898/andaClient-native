import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import TabBar from "../components/TabBar";
import Navbar from "../components/Navbar";

const FaqComponent = (props) => {
  const [open, setOpen] = useState(false);
  const openHandler = (val) => {
    setOpen((pre) => !pre);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ paddingHorizontal: 10, paddingBottom: 5 }}>
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: "rgba(0,0,0,.03)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,.125)",
          }}
        >
          <Pressable
            style={{
              color: "#494c4c",
              fontWeight: "bold",
              paddingVertical: 5,
              textDecorationLine: "underline",
            }}
            onPress={() => {
              openHandler(1);
            }}
          >
            <Text>{props.question}</Text>
          </Pressable>
        </View>
        {open && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,.125)",
            }}
          >
            <Text style={{ textAlign: "center" }}>{props.answer}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const Faq = () => {
  const openHandler = (val) => {
    setOpen((pre) => !pre);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <Navbar />
      <View style={styles.prductListBlue}>
        <Text style={styles.productText}>Frequently Asked Questions</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>PLACE & TRACK ORDERS</Text>
              </View>
            </View>

            <FaqComponent
              question={"Q: HOW DO I PLACE AN ORDER?"}
              answer={
                "To place an order you can sign-up for an online account, call a dedicated sales representative, fax your order or process it via EDI transmission."
              }
            />
            <FaqComponent
              question={"Q: CAN I TRACK MY ORDER?"}
              answer={"Yes, to track an order sign-in to your online account."}
            />
            <FaqComponent
              question={"Q: WHAT ARE THE ORDER CUT-OFF TIMES?"}
              answer={
                "Orders can be placed up until 9:30pm ET online or 9:00pm ET by phone."
              }
            />
            <FaqComponent
              question={"Q: IS THERE A MINIMUM ORDER?"}
              answer={
                "We do not have a minimum order amount. Orders less than $100 are subject to a $10.50 process fee."
              }
            />
            <FaqComponent
              question={"Q: IS THERE A MINIMUM ORDER?"}
              answer={
                "We do not have a minimum order amount. Orders less than $100 are subject to a $10.50 process fee."
              }
            />
            <FaqComponent
              question={
                "Q: WHAT SHOULD I DO IF I HAVE A PROBLEM WITH MY ORDER?"
              }
              answer={
                "Contact an Anda Customer Service representative at 1-800-331-2632."
              }
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>PLACE & TRACK ORDERS</Text>
              </View>
            </View>
            <FaqComponent
              question={"Q: DO YOU OFFER FREE SHIPPING?"}
              answer={
                "Yes, we offer free shipping on all orders over $100. Orders below the minimum are subject to a $10.50 processing fee."
              }
            />
            <FaqComponent
              question={"Q: DO YOU OFFER SAME DAY DELIVERY?"}
              answer={
                "Same day delivery is limited to select locations within South Florida. To find out if you qualify for same day delivery, email or call your dedicated Anda Representative."
              }
            />
            <FaqComponent
              question={"Q: DO YOU OFFER SATURDAY DELIVERY?"}
              answer={
                "Yes, we offer Saturday delivery on all items except refrigerated items."
              }
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>
                  INVOICES, CREDITS, & PAYMENT
                </Text>
              </View>
            </View>
            <FaqComponent
              question={"Q: WHAT METHODS OF PAYMENT DOES ANDA ACCEPT?"}
              answer={
                "You can pay your invoices or monthly statements by signing up for ACH payment, by check, or credit card."
              }
            />
            <FaqComponent
              question={"Q: CAN I SET UP AUTOMATIC PAYMENT?"}
              answer={
                "Yes, to set up automatic payments contact an Account Services representative at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I GET A COPY OF AN INVOICE OR STATEMENT?"}
              answer={
                "To access your invoices sign in to your online account and go to Order History or contact customer service at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I GET A COPY OF A CREDIT MEMO?"}
              answer={
                "To obtain a copy of a credit memo sign in to your online account and go to the Credit page or contact customer service at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I APPLY CREDITS?"}
              answer={
                "You can apply credits to your invoices through your online account or contact your dedicated Anda representative."
              }
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>RETURNS</Text>
              </View>
            </View>
            <FaqComponent
              question={"Q: WHAT IS YOUR RETURNS POLICY?"}
              answer={
                "Our Returns Policy is located under Support on the top menu bar of the website and/or the footer."
              }
            />
            <FaqComponent
              question={"Q: WHAT IS YOUR RETURNS POLICY?"}
              answer={
                "Our Returns Policy is located under Support on the top menu bar of the website and/or the footer."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I PROCESS A RETURN?"}
              answer={
                "You can sign-in to your online account, go to Orders and find the Order History tab to initiate a return. You can also call Customer Service to help you process your return."
              }
            />
            <FaqComponent
              question={"Q: WHERE CAN I FIND A RETURNS AUTHORIZATION FORM?"}
              answer={
                "When processing a return online, once approved, the authorization form will be provided online as part of the process. Please keep in mind, a return can only be initiated once the item has been delivered. Customer Service will provide you with a printable Returns Authorization form if needed."
              }
            />
            <FaqComponent
              question={"Q: WHEN WILL THE RETURN BE PICKED UP?"}
              answer={
                "When processing a return online, you will be able to select shipping options. You can schedule a pick up as soon as the return is approved."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I GET A RETURN SHIPPING LABEL?"}
              answer={
                "For returns processed online, the shipping label will be available for printing. For returns processed over the phone, once the return has been approved, the shipping label will be available online for printing. If requested, our Customer Service team can also email or fax you the shipping label."
              }
            />
            <FaqComponent
              question={
                "Q: HOW LONG BEFORE CREDIT IS POSTED ON ACCOUNT ONCE THE AUTHORIZED RETURN IS PICKED UP?"
              }
              answer={
                "The credit is issued to your account in about 2-3 weeks from the time the return is processed and received into our warehouse."
              }
            />
            <FaqComponent
              question={
                "Q: FEDEX ATTEMPTED TO PICK UP MY RETURN, BUT DIDN’T HAVE THE SHIPPING LABELS. WHAT SHOULD I DO?"
              }
              answer={"Call Customer Service at 1-800-331-2632."}
            />
            <FaqComponent
              question={
                "Q: FEDEX HASN'T PICKED UP OUR RETURN YET. WHAT SHOULD I DO?"
              }
              answer={"Call Customer Service at 1-800-331-2632."}
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>RECALLS</Text>
              </View>
            </View>
            <FaqComponent
              question={"Q: DID I RECEIVE RECALLED PRODUCT?"}
              answer={
                "If you have purchased a recalled product from Anda you will receive a recall notification from us with instructions on what to do. If you did not receive a notice or have any additional questions you can contact Customer Service at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: WHAT DO I DO IF I HAVE RECALLED PRODUCT?"}
              answer={
                "If you have a recalled product from Anda, follow the instructions on what to do. If you have any additional questions you can contact customer service at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: DOES ANDA TAKE BACK OPEN RECALLED PRODUCTS?"}
              answer={
                "Yes, Anda does accept partially used or open items, only if the product is recalled, controls excluded."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I RETURN RECALLED PRODUCTS BACK TO ANDA?"}
              answer={
                "You can sign-in to your online account, go to Orders and find the Order History tab to initiate a recall return. You can also call Customer Service to help you process your recall return."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I GET A RETURN SHIPPING LABEL?"}
              answer={
                "For recall returns processed online, the shipping label will be available for printing. For recall returns processed over the phone, our Customer Service team will email or fax you the shipping label."
              }
            />
            <FaqComponent
              question={"Q: WHEN WILL THE RECALLED PRODUCT BE PICKED UP?"}
              answer={
                "You can schedule a pick up online as soon as the recall return is approved. Shipping is waived for all recalls."
              }
            />
            <FaqComponent
              question={
                "Q: WHEN WILL RECALLED PRODUCTS BE CREDITED TO MY ACCOUNT?"
              }
              answer={
                "The credit is issued to your account in about 2-3 weeks from the time the recall is processed, returned and received into our warehouse."
              }
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>WEBSITE FUNCTIONALITY</Text>
              </View>
            </View>
            <FaqComponent
              question={"Q: HOW DO I CHANGE OR RESET MY ONLINE PASSWORD?"}
              answer={
                "To change your online password, go to the Account section and click the Profile tab. If you are locked out of your account or if you forgot your password and can't log in, please call Tech Support at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: HOW DO I CHANGE MY USERNAME"}
              answer={
                "To change your username, go to the Account section and click the Profile tab. If you are locked out of your account or if you forgot your password and can't log in, please call Tech Support at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"Q: CAN I ADD MULTIPLE USERS TO MY ACCOUNT?"}
              answer={
                "Yes, you can have more than one user ID associated with an account. Contact Tech Support at 1-800-331-2632 to add additional users."
              }
            />
            <FaqComponent
              question={"Q: WHAT ARE THE BROWSER REQUIREMENTS"}
              answer={
                "Supported browsers include Internet Explorer (version 10 and above), Google Chrome, or Mozilla Firefox so you can enjoy a superior, more secure online experience."
              }
            />
            <FaqComponent
              question={"Q: CAN I ACCESS MY ORDER HISTORY ONLINE?"}
              answer={
                "Yes, you'll be able to see all of your invoices, statements and ordered products online."
              }
            />
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>MISCELLANEOUS</Text>
              </View>
            </View>
            <FaqComponent
              question={"CAN I REPRINT SHELF LABELS?"}
              answer={
                "To obtain shelf labels contact Customer Service at 1-800-331-2632."
              }
            />
            <FaqComponent
              question={"HOW DO I CHANGE ACCOUNT INFORMATION?"}
              answer={
                "Contact your dedicated Anda Sales Representative at 1-800-331-2632 to make any changes to your account."
              }
            />
            <FaqComponent
              question={
                "WHERE CAN I FIND INFORMATION ABOUT DRUG SHORTAGES IN THE MARKET?"
              }
              answer={
                "To obtain information about drug shortages, go to our Resources page and click on the ASHP Drug Shortages link."
              }
            />
            <FaqComponent
              question={"HOW DO I OBTAIN AN MSDS SHEET?"}
              answer={
                "To obtain an MSDS sheet go to our Resources page and click on the MSDS link."
              }
            />
          </View>
        </ScrollView>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  prductListBlue: {
    backgroundColor: "#006ba6",
    height: 30,
    marginBottom: 10,
    justifyContent: "center",
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "800",
  },
});
