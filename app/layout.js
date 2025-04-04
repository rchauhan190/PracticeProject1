
import "./globals.css";
import CustomThemeProvider from "./context/ThemeContext";




export const metadata = {
  title: "wizkle",
  description: "Best place for education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <CustomThemeProvider>
      {children}
      </CustomThemeProvider>
      </body>
    </html>
  );
}
