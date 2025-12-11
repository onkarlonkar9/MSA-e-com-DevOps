// import required modules
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderConfirmationEmail({
  to,
  orderId,
  fullName,
  amount,
  method,
  phoneNumber,
}) {
  try {
    await resend.emails.send({
      from: "MSA <msa@updates.ganeshsalunkhe.in>",
      to,
      subject: "Order Confirmed!!",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #fafafa;">
            <h2 style="color: #1D4ED8; text-align: center;">✅ Order Confirmed</h2>
            
            <p style="font-size: 16px; color: #333;">Hi <strong>${fullName}</strong>,</p>
            
            <p style="font-size: 15px; color: #444; line-height: 1.6;">
              Thank you for shopping with <strong>MSA</strong>! 🎉  
              Your order has been placed successfully and is now being processed.
            </p>

          <div style="margin: 20px 0; padding: 15px; background: #fff; border-radius: 6px; border-left: 4px solid #1D4ED8;">
            <p style="margin: 8px 0; font-size: 15px; color: #333;">
              <strong>Order ID: #${orderId}</strong> 
            </p>
            <p style="margin: 8px 0; font-size: 15px; color: #333;">
              <strong>Amount Paid: ₹${amount}</strong> 
            </p>
            <p style="margin: 8px 0; font-size: 15px; color: #333;">
              <strong style="Capitalize" >Payment Method: ${method}</strong>
            </p>
            <p style="margin: 8px 0; font-size: 15px; color: #333;">
              <strong>Contact: ${phoneNumber}</strong>
            </p>
          </div>

            <p style="font-size: 15px; color: #444; line-height: 1.6;">
              You'll receive updates about your order on this email and your registered phone number.  
              For any questions, reach us at <a href="mailto:iamganeshsalunkhe@gmail.com" style="color: #1D4ED8;">support@MSA.com</a>.
            </p>

            <p style="font-size: 15px; color: #444;">
              Thank you for trusting us. We look forward to serving you! 
            </p>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;" />
            <p style="font-size: 13px; color: #888; text-align: center;">
              © ${new Date().getFullYear()} MSA. All rights reserved.
            </p>
          </div>
        `,
    });
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

module.exports = sendOrderConfirmationEmail;
