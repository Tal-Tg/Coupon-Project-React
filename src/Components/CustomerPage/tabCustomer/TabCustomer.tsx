import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CustomerPage1 from '../pages';



interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Tab2() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        >
        {/* <Tab label="Add company" {...a11yProps(0)} />
        <Tab label="Update company" {...a11yProps(1)} />
        <Tab label="Delete company" {...a11yProps(2)} /> */}
        <Tab label="Customer Manage" {...a11yProps(0)} />
        {/* <Tab label="Get Company" {...a11yProps(1)} /> */}
        {/* <Tab label="Add Customer" {...a11yProps(5)} />
        <Tab label="Update customer" {...a11yProps(6)} />
        <Tab label="Delete customer" {...a11yProps(7)} /> */}
        {/* <Tab label="Customers" {...a11yProps(1)} /> */}
        {/* <Tab label="Get customer" {...a11yProps(3)} /> */}
        </Tabs>
        </AppBar>
        {/* <TabPanel value={value} index={0}>
        <AddNewCompany/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <UpdateCompany/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <DeleteCompany/>
        </TabPanel> */}
        <TabPanel value={value} index={0}>
        <CustomerPage1/>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
        <GetOneCompany/>
        </TabPanel> */}
        {/* <TabPanel value={value} index={5}>
        <AddCustomer/>
        </TabPanel>
        <TabPanel value={value} index={6}>
        <UpdateCustomer/>
        </TabPanel>
        <TabPanel value={value} index={7}>
        <DeleteCustomer/>
        </TabPanel> */}
        <TabPanel value={value} index={1}>
        
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
        <GetOneCustomer/>
        </TabPanel> */}
    </div>
  );
}

export default Tab2;