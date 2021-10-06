import React, { useEffect, useState } from 'react';
import tokenAxios from '../../../../Interceptor/Interceptor';
import notify from '../../../../service/Notification';
import {
  GetAllCompanyContainer, GetAllCompanyWrapper, GetAllCompanyHeader, CompanyButtonEdit,
  CheckButton, CompanyButton, CancelButton, GetAllCompanyPErrors
} from './GetAllCompaniesElements'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { NavLink, useHistory } from 'react-router-dom';
import CompanyModel from '../../../../Model/AdminModels/CompanyModel';
import store from '../../../../Redux/Store';
import { addCompanyAction, CompanyDeletedAction, CompanyUpdateAction, downloadedAction } from '../../../../Redux/AdminState';
import TableAdmin from '../../TableAdmin/TableCompany';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MdClose } from 'react-icons/md'
import EditIcon from '@material-ui/icons/Edit';
import GetOneCompany from '../GetOneCompanyPage';
import { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { useForm } from 'react-hook-form';
import UpdateTableModel from '../../../../Model/AdminModels/UpdateTableModel';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {CompanyData} from './CompanyData'

function GetAllCompany() {

  useEffect(() => {
    send();
    store.subscribe(() => setCompanies(store.getState().adminState.companies));
    
  });

  

  
  const [companies, setCompanies] = useState([]);
  const [count, setCount] = useState(-1);
  const [edit, setEdit] = useState(false);

  const [editContactId, setEditContactId] = useState(0);
  const [addCompany , setAddCompany ] = useState(false);
 

  const history = useHistory();
  const { register, handleSubmit, formState: { errors } ,reset } = useForm<UpdateTableModel>({
    mode: "onTouched"
  });


  async function send() {

    if (store.getState().adminState.companies.length > count) {
      
      try {
        const response = await tokenAxios.get("http://localhost:8080/admin/company");
        store.dispatch(downloadedAction(response.data));
        setCompanies([response.data]);
        setCompanies(store.getState().adminState.companies);
        setCount(store.getState().adminState.companies.length);

      } catch (error) {
        notify.error("");
      }
    } else {

    }

  }

 

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

  async function deleteByX(c: number) {
    try {
      const response = await tokenAxios.delete("http://localhost:8080/admin/company/" + c);
      store.dispatch(CompanyDeletedAction(c));
      notify.success('delete successfully');
    } catch (e) {
      notify.error("");
    }
  }

  async function EditCompany(c: CompanyModel) {
    console.log(c);
    setEdit(!edit);
    setEditContactId(c.id)
  }

  async function sendEdit(c: UpdateTableModel ) {
    
    c.id = editContactId;
    if(c.id > 0){
      try {
        const response = await tokenAxios.put("http://localhost:8080/admin/update/"+c.id, c);
        console.log(response.data)
        store.dispatch(CompanyUpdateAction(response.data));
        setEditContactId(0);
        setEdit(false);
        setAddCompany(false);
        reset({}) 
        notify.success('edit successfully');
        history.push('/')
        return history.push('/My-PersonalA');
      } catch (err) {
        notify.error("edit faild");
        reset({}) 
      }
   }else if(c.id ===0){
      try{
        const response = await tokenAxios.post("http://localhost:8080/admin/company", c);
        console.log(response.data);
        store.dispatch(addCompanyAction(response.data));
        setEditContactId(0);
        setEdit(false);
        setAddCompany(false);
        reset({}) 
        notify.success('added successfully');
        history.push('/')
        return history.push('/My-PersonalA');
      }catch(error){
        notify.error("add failde");
        reset({}) 
      }
    }
    reset({});
    
  }

  function cancelAll() {
    setEdit(false);
    setEditContactId(0);
    setAddCompany(false);
    
  }

  function AddCompany(){
    
    setAddCompany(!addCompany);
    setEditContactId(0);
    setEdit(!edit);
    

  }





  const classes = useStyles();

  return (

    <div>
        <form onSubmit={handleSubmit(sendEdit)}>
        <br />
        <NavLink to="/HomePage"><HomeOutlinedIcon /></NavLink>/ Companies
        <br /><br />
        <GetAllCompanyContainer>
          <GetAllCompanyWrapper>
            <GetAllCompanyHeader>Companies</GetAllCompanyHeader>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Company Details</StyledTableCell>
                    <StyledTableCell align="right">Id</StyledTableCell>
                    <StyledTableCell align="right">name&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Password&nbsp;</StyledTableCell>
                    {!edit ?<> <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Edit&nbsp;</StyledTableCell></>

                    :

                    <><StyledTableCell align="right">Cancel&nbsp;(C)</StyledTableCell>
                    <StyledTableCell align="right">Submit&nbsp;(S)</StyledTableCell></>}
                  </TableRow>
                </TableHead>
                <TableBody>
                
                  {companies?.map((c) => 
                    <Fragment>
                      {editContactId === c.id ? <StyledTableRow key={c.id}>

                        <StyledTableCell component="th" scope="row">
                          {c.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{c.id}</StyledTableCell>
                        <StyledTableCell align="right">{c.name}</StyledTableCell>
                        <StyledTableCell align="right"><TextField id="email" label="email" variant="outlined" type="text" placeholder="enter email"
                        
                        {...register("email", { required: { value: true, message: "email is required" } })} /></StyledTableCell>
                        <StyledTableCell align="right"><TextField id="password" label="password" variant="outlined" type="password" placeholder="enter password"
                        {...register("password", { required: { value: true, message: "password is required" } })} /></StyledTableCell>
                        <StyledTableCell align="right"><CancelButton onClick={() => cancelAll()}><CancelIcon /></CancelButton></StyledTableCell>
                        <StyledTableCell align="right"><CheckButton type="submit" /></StyledTableCell>
                      </StyledTableRow>
                      
                        :

                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {c.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{c.id}</StyledTableCell>
                          <StyledTableCell align="right">{c.name}</StyledTableCell>
                          <StyledTableCell align="right">{c.email} </StyledTableCell>
                          <StyledTableCell align="right">{c.password}</StyledTableCell>
                          <StyledTableCell align="right"><CompanyButton onClick={() => deleteByX(c.id)}><MdClose /></CompanyButton></StyledTableCell>
                          <StyledTableCell align="right"><CompanyButtonEdit onClick={() => EditCompany(c)}><EditIcon /></CompanyButtonEdit></StyledTableCell>
                        </StyledTableRow>}
                        
                    </Fragment>
                    
                  )}
                  
                  

                    {!addCompany?<><StyledTableRow key="add">
                          <StyledTableCell component="th" scope="row">
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"> </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"><CompanyButtonEdit onClick={() => AddCompany()} ><AddIcon/></CompanyButtonEdit></StyledTableCell>
                        </StyledTableRow></>

                        :
                        <StyledTableRow key="add1">
                          <StyledTableCell component="th" scope="row">
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="name" label="name" variant="outlined" type="text" placeholder="enter name"
                          {...register("name", { required: { value: true, message: "name is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><TextField id="email" label="email" variant="outlined" type="text" placeholder="enter email"
                          {...register("email", { required: { value: true, message: "email is required" } })} /> </StyledTableCell>
                          <StyledTableCell align="right"><TextField id="password" label="password" variant="outlined" type="text" placeholder="enter email"
                          {...register("password", { required: { value: true, message: "password is required" } })} /></StyledTableCell>
                          <StyledTableCell align="right"><CompanyButtonEdit onClick={() => cancelAll()} ><CancelIcon /></CompanyButtonEdit></StyledTableCell>
                          <StyledTableCell align="right"><CheckButton type="submit" /></StyledTableCell>
                        </StyledTableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </GetAllCompanyWrapper>
        </GetAllCompanyContainer>
        {store.getState().adminState.companies.length} Companies.
        <GetOneCompany />
       </form>
    </div>

  )
}



export default GetAllCompany;


