import React, { Fragment, useEffect, useState } from 'react';
import tokenAxios from '../../../../Interceptor/Interceptor';
import notify from '../../../../service/Notification';
import {GetAllCustomersContainer,GetAllCustomersWrapper,GetAllCustomersHeader,
  CustomerButtonEdit,CheckButton,CancelButton,GetAllCustomersPErrors,GetAllCustomerButtonAdd, CustomerButton
} from './GetAllCustomersElements';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { NavLink, useHistory } from 'react-router-dom';
import store from '../../../../Redux/Store';
import { addCustomerAction, CustomerDeletedAction, downloadedAction } from '../../../../Redux/AdminCustomerState';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import UpdateTableModelCustomer from '../../../../Model/AdminModels/UpdateTableModelCustomer';
import { useForm } from 'react-hook-form';
import CustomerModel from '../../../../Model/AdminModels/CustomerModel';
import CancelIcon from '@material-ui/icons/Cancel';
import { MdClose } from 'react-icons/md'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import GetOneCustomer from '../GetOneCustomerPage';
import { CompanyUpdateAction } from '../../../../Redux/AdminState';

function GetAllCustomers() {
    const history = useHistory();
    const [customers, setCustomers ] = useState([]);
    const [count, setCount] = useState(-1);
    const [edit, setEdit] = useState(false);
    const [editContactId, setEditContactId] = useState(0);
    const [addCustomer , setAddCustomer ] = useState(false);
    
    const { register, handleSubmit, formState: { errors },reset } = useForm<UpdateTableModelCustomer>({
        mode: "onTouched"
      });

    async function send() {
        if(store.getState().adminCustomerState.customers.length > count){
        try{
            const response = await tokenAxios.get("http://localhost:8080/admin/customer");
            store.dispatch(downloadedAction(response.data));
            setCustomers(store.getState().adminCustomerState.customers);
            setCount(store.getState().adminCustomerState.customers.length);
            reset({});
        }catch(error){
            notify.error("");
        }
        }else{

        }
    }

    useEffect(() => {
        store.subscribe(() => setCustomers(store.getState().adminCustomerState.customers));
        send();
    });



    const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }),
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }),
  )(TableRow);


  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  async function EditCustomer(c: CustomerModel) {
    setEdit(!edit);
    setEditContactId(c.id)
  }

  function cancelAll() {
    setEdit(false);
    setEditContactId(0);
    setAddCustomer(false);
  }

  async function sendEdit(c: UpdateTableModelCustomer) {
    c.id = editContactId;
    if(c.id !== 0){
      try {
        const response = await tokenAxios.put("http://localhost:8080/admin/customer", c);
        console.log(response.data)
        store.dispatch(CompanyUpdateAction(c));
        setEditContactId(0);
        setEdit(false);
        setAddCustomer(false);
        reset({})
        notify.success('edit successfully');
        // history.push('/')
        // return history.push('/My-PersonalA');
      } catch (err) {
        notify.error("");
      }
    }else{
      try{
        const response = await tokenAxios.post("http://localhost:8080/admin/customer", c);
        store.dispatch(addCustomerAction(response.data));
        setEditContactId(0);
        reset({})
        setEdit(false);
        setAddCustomer(false);
        notify.success('added successfully');
        // history.push('/')
        // return history.push('/My-PersonalA');
      }catch(error){
        notify.error("");
  
      }
    }
    reset({});
  }

  async function deleteByX(c: number) {
    try {
      const response = await tokenAxios.delete("http://localhost:8080/admin/customer/" + c);
      store.dispatch(CustomerDeletedAction(c));
      reset({});
      notify.success('delete successfully');
    } catch (e) {
      notify.error("");
    }
  }

  function AddCustomer(){
    setAddCustomer(!addCustomer);
    setEdit(false);
    
  }

    return (
        <div>
        <form onSubmit={handleSubmit(sendEdit)}>
        <br />
        <NavLink to="/HomePage"><HomeOutlinedIcon /></NavLink>/ Customers
        <br /><br />
        <GetAllCustomersContainer>
          <GetAllCustomersWrapper>
            <GetAllCustomersHeader>Customers</GetAllCustomersHeader>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Customer Details</StyledTableCell>
                    <StyledTableCell align="right">Id</StyledTableCell>
                    <StyledTableCell align="right">first name&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">last name&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">email&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">password&nbsp;</StyledTableCell>
                    {!edit ?<> <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Edit&nbsp;</StyledTableCell></>
                    :
                    <><StyledTableCell align="right">Cancel&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Submit&nbsp;</StyledTableCell></>}
                  </TableRow>
                </TableHead>
                <TableBody>
               
                  {customers.map((c) => (
                    <Fragment>

                      {editContactId === c.id ? <StyledTableRow key={c.id}>
                        <StyledTableCell component="th" scope="row">
                          {c.firstName +" " + c.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="right">{c.id}</StyledTableCell>
                        <StyledTableCell align="right"><TextField id="firstName" label="first name" variant="outlined" type="text" placeholder="enter first name"
                          {...register("firstName", { required: { value: true, message: "email is required" } })} /></StyledTableCell>
                        <StyledTableCell align="right"><TextField id="lastName" label="last name" variant="outlined" type="text" placeholder="enter last name"
                          {...register("lastName", { required: { value: true, message: "email is required" } })} /></StyledTableCell>
                        <StyledTableCell align="right"><TextField id="email" label="email" variant="outlined" type="text" placeholder="enter email"
                          {...register("email", { required: { value: true, message: "email is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="password" label="password" variant="outlined" type="password" placeholder="enter password"
                          {...register("password", { required: { value: true, message: "email is required" } })} /></StyledTableCell>
                        <StyledTableCell align="right"><CancelButton onClick={() => cancelAll()}><CancelIcon /></CancelButton></StyledTableCell>
                        <StyledTableCell align="right"><CheckButton type="submit" /></StyledTableCell>
                      </StyledTableRow>
                      
                        :

                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                          {c.firstName +" " + c.lastName}
                          </StyledTableCell>
                          <StyledTableCell align="right">{c.id}</StyledTableCell>
                          <StyledTableCell align="right">{c.firstName}</StyledTableCell>
                          <StyledTableCell align="right">{c.lastName} </StyledTableCell>
                          <StyledTableCell align="right">{c.email}</StyledTableCell>
                          <StyledTableCell align="right">{c.password}</StyledTableCell>
                          <StyledTableCell align="right"><CustomerButton onClick={() => deleteByX(c.id)}><MdClose /></CustomerButton></StyledTableCell>
                          <StyledTableCell align="right"><CustomerButtonEdit onClick={() => EditCustomer(c)}><EditIcon /></CustomerButtonEdit></StyledTableCell>
                        </StyledTableRow>}
                        
                    </Fragment>
                    
                  ))}
                  
                  

                    {!addCustomer?<><StyledTableRow key="add">
                          <StyledTableCell component="th" scope="row">
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"> </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"><CustomerButtonEdit onClick={() => AddCustomer()} ><AddIcon/></CustomerButtonEdit></StyledTableCell>
                        </StyledTableRow></>

                        :
                        <><StyledTableRow key="add1">
                          <StyledTableCell component="th" scope="row">
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="firstName" label="first name" variant="outlined" type="text" placeholder="enter first name"
                          {...register("firstName", { required: { value: true, message: "name is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="lastName" label="last name" variant="outlined" type="text" placeholder="enter last name"
                          {...register("lastName", { required: { value: true, message: "name is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="email" label="email" variant="outlined" type="text" placeholder="enter email"
                          {...register("email", { required: { value: true, message: "email is required" }})} /> </StyledTableCell>
                          <StyledTableCell align="right"><TextField id="password" label="password" variant="outlined" type="text" placeholder="enter email"
                          {...register("password", { required: { value: true, message: "password is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><CustomerButtonEdit onClick={() => cancelAll()} ><CancelIcon /></CustomerButtonEdit></StyledTableCell>
                          <StyledTableCell align="right"><CheckButton type="submit" /></StyledTableCell>
                        </StyledTableRow></>}
                </TableBody>
              </Table>
            </TableContainer>
          </GetAllCustomersWrapper>
        </GetAllCustomersContainer>
        {store.getState().adminCustomerState.customers.length} Customers.
        <GetOneCustomer/>
        </form>
    </div>
    )
}

export default GetAllCustomers;
