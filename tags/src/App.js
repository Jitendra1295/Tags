import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TagPopover from "./Popover/Tag_Popover"
const theme = createTheme({
  palette: {
    blue: {
      main: '#2196F3', // Adjust this to your desired blue color
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Your other components */}
        <TagPopover />
      </div>
    </ThemeProvider>
  );
}

export default App;
