import React from 'react'
import Layout from '../Components/Layout/Layout'
import Breadcrum from '../Components/Shirts/Breadcrum'
import Filters from '../Components/Shirts/Filters'
import AdditionalFilters from '../Components/Shirts/AdditionalFilters'
import ProductSection from '../Components/Shirts/ProductSection/ProductSection'

const Shirts = () => {
    return (
        <Layout>
            <Breadcrum />
            <main
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Filters />
                <div
                    style={{
                        width: "84%",
                    }}
                >
                    <AdditionalFilters />
                    <ProductSection />
                    
                </div>
            </main>
            <aside
                style={{
                    width: "500px",
                    height: "100vh",
                    position: "fixed", 
                    top: 0, 
                    right: 0, 
                    zIndex: 100,
                    backgroundColor: "#ffffff",
                    display: "none"
                }}
            >

            </aside>
        </Layout>
    )
}

export default Shirts
