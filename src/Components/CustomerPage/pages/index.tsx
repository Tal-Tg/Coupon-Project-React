import react, { Fragment, useEffect, useState } from 'react';
import {CustomerPage1Container,CustomerPage1Wrapper,GetCustomerCouponsHeader,CustomerCouponButton
    ,CustomerButtonEdit,CheckButton,CancelButton,
    DivAmountBuyersCount1,DivAmountBuyers1,DivLocation1,DivLetterFromPriceIcon1,DivLetterFromPrice1,DivLetterFrom1
    ,DivAmountDeprecated21,DivAmountDeprecated1,ProductInfo1,ProductTitle1,ProductHeading1,
    ProductImg1,ProductCard1,ProductsWrapper1,ProductsContainer1} from './CustomerPage1Elements';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import SendCustomerPurchaseModel from '../../../Model/CustomerModel/SendCustomerPurchaseModel';
import tokenAxios from '../../../Interceptor/Interceptor';
import store from '../../../Redux/Store';
import { downloadedAction } from '../../../Redux/CustomerState';
import notify from '../../../service/Notification';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { MdClose } from 'react-icons/md'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Products } from '../../Products';

function CustomerPage1(){

    const history = useHistory();

    const [customerCoupons, setCustomerCoupons] = useState([]);
    const [couponsForPurchase, setCouponForPurchase] = useState([]);
    const [count,setCount] = useState(-1);
    const [edit,setEdit] = useState(false);
    const [editContactId, setEditContactId] = useState(0);


    const { register, handleSubmit, formState: { errors },reset } = useForm<SendCustomerPurchaseModel>({
        mode: "onTouched"
      });
      
      useEffect(() =>{
        if(store.getState().customerState.couponVsCustomer.length > count){
            store.subscribe(() => setCustomerCoupons(store.getState().customerState.couponVsCustomer));
            getCustomerCoupons();
            getAllCoupons();
        }

      })

      async function getCustomerCoupons(){
          try {
              const response = await tokenAxios.get("http://localhost:8080/customer/coupon/"+store.getState().authState.user.id);
              store.dispatch(downloadedAction(response.data));
              setCustomerCoupons(response.data);
              setCount(store.getState().customerState.couponVsCustomer.length);
          } catch (error) {
              
          }
      }

      async function getAllCoupons(){
        try {
          const response = await tokenAxios.get("http://localhost:8080/customer/all-coupon/"+store.getState().authState.user.id);
          setCouponForPurchase(response.data);
          
      } catch (error) {
          
      }
      }

    function EditCoupon(c: SendCustomerPurchaseModel) {
        setEdit(!edit);
        setEditContactId(c.id)
      }


      async function sendEdit(){

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

  const classes = useStyles();
    
    
    return(
        <div>
        
        <br />
        <NavLink to="/HomePage"><HomeOutlinedIcon /></NavLink>/ Coupons
        <br /><br />

        <CustomerPage1Container>
          <CustomerPage1Wrapper>
            <GetCustomerCouponsHeader>Your Coupons</GetCustomerCouponsHeader>
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Coupons Details</StyledTableCell>
                    <StyledTableCell align="right">Id</StyledTableCell>
                    <StyledTableCell align="right">category id&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">title&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">description&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">start date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">end date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">amount&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">price&nbsp;&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">image&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                
                  {customerCoupons? customerCoupons.map((c) => (
                    <Fragment>
                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {c.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">{c.id}</StyledTableCell>
                          <StyledTableCell align="right">{c.categoryId}</StyledTableCell>
                          <StyledTableCell align="right">{c.title} </StyledTableCell>
                          <StyledTableCell align="right">{c.description}</StyledTableCell>
                          <StyledTableCell align="right">{c.startDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.endDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.amount}</StyledTableCell>
                          <StyledTableCell align="right">{c.price}</StyledTableCell>
                          <StyledTableCell align="right">{c.image}</StyledTableCell>
                        </StyledTableRow>
                        
                    </Fragment>
                    
                  )):""}
                </TableBody>
              </Table>
            </TableContainer>
                    
            </CustomerPage1Wrapper>
          </CustomerPage1Container>
  
  
        <br />
        <br />
        <CustomerPage1Container>
          <CustomerPage1Wrapper>
                    <GetCustomerCouponsHeader>Purchase a coupon</GetCustomerCouponsHeader>
                    <br />
                    <br />
            <ProductsContainer1>
            
            <ProductHeading1> &nbsp;&nbsp;&nbsp;&nbsp;{""}</ProductHeading1>
            <ProductsWrapper1>
            {couponsForPurchase.map((product, index) => {
                return(
                    <ProductCard1 key={index} >
                        <ProductImg1 src={product.image} alt={product.alt}/>
                        <ProductInfo1>
                            <ProductTitle1>{product.name} <DivAmountDeprecated1>{product.alt}₪</DivAmountDeprecated1></ProductTitle1>
                            <DivLetterFrom1>from- <DivLetterFromPrice1> {product.price}</DivLetterFromPrice1> <DivLetterFromPriceIcon1> ₪</DivLetterFromPriceIcon1> </DivLetterFrom1>
                            <DivAmountBuyers1><DivLocation1><img className="imgForLocation" src="https://media.groo.co.il/_media/images/header/icon-location.png"/></DivLocation1>&nbsp; Shopping  <DivAmountBuyersCount1>Bought:&nbsp;502+&nbsp;  </DivAmountBuyersCount1></DivAmountBuyers1>
                            {/* <ProductDesc>{product.desc}</ProductDesc> */}
                            {/* <ProductPrice>{product.price}</ProductPrice> */}
                            {/* <ProductButton>{product.button}</ProductButton> */}
                        </ProductInfo1>
                    </ProductCard1>
                
                );
            })}
            </ProductsWrapper1>
        </ProductsContainer1>
                   
          </CustomerPage1Wrapper>
          </CustomerPage1Container>
        {/* <div>
        <GetAllCouponsContainer>
          <GetAllCouponsWrapper>
          
          <GetAllCouponsHeader>Coupons By Category</GetAllCouponsHeader>
          <CompanyPageInputCategoryId>
            <HeaderForInputCategory>Enter here the category number </HeaderForInputCategory>
           <TextField id="category id" label="Category" variant="outlined" type="text"  
                        onChange={handleInput}/>
                          <br />
                          
                          <div onClick={() =>  getCompanyCategory()}>Submit</div>
          </CompanyPageInputCategoryId>
          
        
        
        <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Coupons Details</StyledTableCell>
                    <StyledTableCell align="right">Id</StyledTableCell>
                    <StyledTableCell align="right">category id&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">title&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">description&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">start date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">end date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">amount&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">price&nbsp;&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">image&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                
                  {couponsByCategory? couponsByCategory.map((c) => (
                    <Fragment>
                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {c.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">{c.id}</StyledTableCell>
                          <StyledTableCell align="right">{c.categoryId}</StyledTableCell>
                          <StyledTableCell align="right">{c.title} </StyledTableCell>
                          <StyledTableCell align="right">{c.description}</StyledTableCell>
                          <StyledTableCell align="right">{c.startDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.endDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.amount}</StyledTableCell>
                          <StyledTableCell align="right">{c.price}</StyledTableCell>
                          <StyledTableCell align="right">{c.image}</StyledTableCell>
                        </StyledTableRow>
                        
                    </Fragment>
                    
                  )):""}
                </TableBody>
              </Table>
            </TableContainer>
            </GetAllCouponsWrapper>
            </GetAllCouponsContainer>
            {couponsByCategory.length} : coupons.
        </div> */}
        
         <br />
        <br />
  
       
        {/* <div>
        <GetAllCouponsContainer>
          <GetAllCouponsWrapper>
          
          <GetAllCouponsHeader>Coupons By Max price</GetAllCouponsHeader>
          <CompanyPageInputCategoryId>
            <HeaderForInputCategory>Enter here the max price </HeaderForInputCategory>
           <TextField id="max price" label="Max price" variant="outlined" type="text"  
                        onChange={handleInputMaxPrice}/>
                          <br />
                          
                          <div onClick={() =>  getCompanyMaxPrice()}>Submit</div>
          </CompanyPageInputCategoryId>
          
        
        
        <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Coupons Details</StyledTableCell>
                    <StyledTableCell align="right">Id</StyledTableCell>
                    <StyledTableCell align="right">category id&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">title&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">description&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">start date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">end date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">amount&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">price&nbsp;&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">image&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                
                  {couponsByMaxPrice? couponsByMaxPrice.map((c) => (
                    <Fragment>
                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {c.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">{c.id}</StyledTableCell>
                          <StyledTableCell align="right">{c.categoryId}</StyledTableCell>
                          <StyledTableCell align="right">{c.title} </StyledTableCell>
                          <StyledTableCell align="right">{c.description}</StyledTableCell>
                          <StyledTableCell align="right">{c.startDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.endDate}</StyledTableCell>
                          <StyledTableCell align="right">{c.amount}</StyledTableCell>
                          <StyledTableCell align="right">{c.price}</StyledTableCell>
                          <StyledTableCell align="right">{c.image}</StyledTableCell>
                        </StyledTableRow>
                        
                    </Fragment>
                    
                  )):""}
                </TableBody>
              </Table>
            </TableContainer>
            </GetAllCouponsWrapper>
            </GetAllCouponsContainer>
            {couponsByMaxPrice.length} : coupons.
            </div> */}
      
    </div>
    );
}

export default CustomerPage1;