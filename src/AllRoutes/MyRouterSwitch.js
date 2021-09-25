import React from 'react'
import { Route, Switch } from 'react-router-dom'

import UserLogin from '../Authentication/UserLogin'
import AdminLogin from '../Authentication/AdminLogin';
import Home from '../HomePage/Home'
import LibraryProducts from '../LandingLibrary/LibraryProducts';
import Register from '../Authentication/Register';
import AllCategroies from '../Modules/CategoryModule/AllCategroies';
import UpdateCategory from '../Modules/CategoryModule/UpdateCategory';
import AddCategory from '../Modules/CategoryModule/AddCategory';
import AllLanguages from '../Modules/Language/AllLanguages';
import AddLanguage from '../Modules/Language/AddLanguage';
import UpdateLanguage from '../Modules/Language/UpdateLanguage';
import AllGenre from '../Modules/Genres/AllGenre';
import AddGenre from '../Modules/Genres/AddGenre'
import UpdateGenre from '../Modules/Genres/UpdateGenre'
import About from '../About';

import Contact from '../Contact'
import AllUsers from '../Modules/UserModule/AllUsers';
import MyProfile from '../Modules/UserModule/MyProfile';
import AllProducts from '../Modules/ProductModule/AllProducts';
import AddProduct from '../Modules/ProductModule/AddProduct'
import ErrorPage from '../ErrorPage';
import AddAuthorsToProduct from '../Modules/ProductModule/AddAuthorsToProduct';
import ViewOneProductById from '../Modules/ProductModule/ViewOneProductById';
import UpdateProduct from '../Modules/ProductModule/UpdateProduct';
import UpdateProductPublisher from '../Modules/ProductModule/UpdateProductPublisher';
import ProductsByCategory from '../Modules/ProductModule/ProductsByCategory';
import ProductByGenre from '../Modules/ProductModule/ProductByGenre';
import UpdateProductAuthors from '../Modules/ProductModule/UpdateProductAuthors';
import Authors from '../Modules/Authors/Authors';
import Publishers from '../Modules/Publishers/Publishers';
import ProductsByLanguage from '../Modules/ProductModule/ProductsByLanguage';
import AllProductsByCategory from '../Modules/ProductModule/AllProductsByCategory';
import AllProductsByLaguage from '../Modules/ProductModule/AllProductsByLaguage';
import AllProductsByGenre from '../Modules/ProductModule/AllProductsByGenre.js';
import ViewOneUser from '../Modules/UserModule/ViewOneUser';
import UpdateProfile from '../Modules/UserModule/UpdateProfile';
import MyShelf from '../Modules/UserModule/MyShelf';
import UpdateProductBasicDetails from '../Modules/ProductModule/UpdateProductBasicDetails';
import BuyProduct from '../Modules/Transactions/BuyProduct';
import RentProduct from '../Modules/Transactions/RentProduct';
import LentProduct from '../Modules/Transactions/LentProduct';
import ViewAllTransaction from '../Modules/Transactions/ViewAllTransaction';
import UploadProductImage from '../Modules/ProductModule/UploadProductImage';
import AllBeneficiary from '../Modules/Beneficiary/AllBeneficiary';
import AddBeneficiary from '../Modules/Beneficiary/AddBeneficiary';
import UpdateBeneficiary from '../Modules/Beneficiary/UpdateBeneficiary';
import ViewBeneficiaryById from '../Modules/Beneficiary/ViewBeneficiaryById';
import OneAuthor from '../Modules/Authors/OneAuthor';
import OnePublisher from '../Modules/Publishers/OnePublisher';
import GenerateInvoice from '../Modules/Transactions/GenerateInvoice';
import AdminHome from '../Admin/AdminHome';
import AllFeedback from '../Feedback/AllFeedback';
import OneFeedback from '../Feedback/OneFeedback';
import Feedback from '../Feedback/Feedback'
import LibraryPackages from '../Modules/LibraryPackage/LibraryPackages';
import BuyLibPack from '../Modules/Transactions/BuyLibPack';
import AddLibPack from '../Modules/LibraryPackage/AddLibPack'
import UserProtectedRoute from '../Authentication/UserProtectedRoute';
import AdminProtected from '../Authentication/AdminProtected';

function MyRouterSwitch({updateUser}) { 
    return (
        <>
            <Switch>
            <Route exact path="/"  component={Home}/>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/library-products" component={LibraryProducts}/>
                <Route exact path="/About-us"  component={About} />
                <Route exact path="/Contact" component={Contact} />
                <Route exact path="/Feedback" component={Feedback} />
                
                <Route exact  path="/User-Login" > <UserLogin updateUser={updateUser} /> </Route>
                <Route exact  path="/Admin-Login" > <AdminLogin updateUser={updateUser} /> </Route>
                <Route exact path="/SignUp" component={Register} />
                <Route exact path="/products-by-category/:cate_id" component={ProductsByCategory} />
                <Route exact path="/products-by-language/:lang_id" component={ProductsByLanguage} />
                <Route exact path="/products-by-genre/:gen_id" component={ProductByGenre} />
                <Route exact path="/products-description/:prod_id" component={ ViewOneProductById } />

                <Route exact path="/all-products-by-category/:CATE/:cate_id" component={AllProductsByCategory} />
                <Route exact path="/all-products-by-language/:LANG/:lang_id" component={AllProductsByLaguage} />
                <Route exact path="/all-products-by-genre/:GEN/:gen_id" component={AllProductsByGenre} />
                <Route exact path="/user-details/:u_id" component={ViewOneUser} />

                <Route exact path="/buy-product/:prod_id" component={BuyProduct} />
                 <Route exact path="/rent-product/:prod_id" component={RentProduct} />
               <Route exact path="/lent-product/:prod_id" component={LentProduct} />

               <Route exact path="/library-package/" component={LibraryPackages} />
               <Route exact path="/buy-librarypackage/:p_id" component={BuyLibPack} />
               <AdminProtected exact path="/admin/add-lib-pack" component={AddLibPack} />
               

                {/* ||||ADMIN|||| */}

                {/* ============CATEGORY============= */}
                <AdminProtected exact path="/admin/admin-home" component={AdminHome} />

                <AdminProtected exact path="/admin/all-feedback" component={ AllFeedback } />
                <AdminProtected exact path="/admin/one-feedback/:f_id" component={ OneFeedback } />

                <AdminProtected  exact path="/admin/categories" component={AllCategroies}/>

                <AdminProtected exact path="/admin/update-category/:cate_id" component={UpdateCategory} />

                <AdminProtected exact path="/admin/add-category" component={AddCategory} />

                {/* ============LANGUAGE============= */}
                <AdminProtected exact path="/admin/languages" component={AllLanguages} />

                <AdminProtected exact path="/admin/add-language" component={AddLanguage} />

                <AdminProtected exact path="/admin/update-language/:lang_id" component={UpdateLanguage} />

                  {/* ============GENRE============= */}
                
                  <AdminProtected exact path="/admin/genres" component={AllGenre} />

                <AdminProtected exact path="/admin/add-genre" component={AddGenre} />

                <AdminProtected exact path="/admin/update-genre/:gen_id" component={UpdateGenre}/>
                
                {/* =================TRANSACTION============= */}
                <AdminProtected exact path="/admin/view-transactions" component={ViewAllTransaction}/>
                
                {/* ===================PRODUCT=============== */}
                <AdminProtected exact path="/admin/products" component={AllProducts} />
                <AdminProtected exact path="/admin/add-product" component={AddProduct } />
                <AdminProtected exact path="/admin/add-product-files/:prod_id" component={UploadProductImage } />
                

                <AdminProtected exact path="/admin/update-product/:prod_id" component={UpdateProduct} />
                <AdminProtected exact path="/admin/update-product-details/:prod_id" component={UpdateProductBasicDetails} />
                <AdminProtected exact path="/admin/update-product-publisher/:prod_id" component={UpdateProductPublisher} />
                <AdminProtected exact path="/admin/update-product-authors/:prod_id" component={UpdateProductAuthors} />
                
                <AdminProtected exact path="/admin/authors" component={Authors} />
                <AdminProtected exact path="/admin/author/:auth_id" component={OneAuthor} />

               
                <AdminProtected exact path="/admin/pubishers" component={Publishers} />
                <AdminProtected exact path="/admin/publisher/:pub_id" component={OnePublisher} />
                {/* --------------------- */}
                <AdminProtected exact path="/admin/baneficiaries" component={AllBeneficiary} />
                <AdminProtected exact path="/admin/add-beneficiary" component={AddBeneficiary} />
                <AdminProtected exact path="/admin/update-beneficiary/:ban_id" component={UpdateBeneficiary} />
                <AdminProtected exact path="/admin/beneficiary/:ban_id" component={ViewBeneficiaryById} />
                
                {/* --------------------- */}
                <AdminProtected exact path="/admin/add-authors-to-product/:prod_id" component={AddAuthorsToProduct} />
                {/* ==================USER=================== */}
                <AdminProtected exact path="/admin/users" component={AllUsers} />

                <UserProtectedRoute exact path="/user/my-profile" component={MyProfile} />

                <UserProtectedRoute exact path="/user/update-my-profile" component={UpdateProfile} />
                <UserProtectedRoute exact path="/user/my-shelf" component={MyShelf} />
                <UserProtectedRoute exact path="/user/generate-invoice" component={GenerateInvoice} />




                <Route path="*" component={ErrorPage} />

            </Switch>

        </>
    )
}

export default MyRouterSwitch
