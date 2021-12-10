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
                        // border: "1px solid red",
                    }}
                >
                    <AdditionalFilters />
                    <ProductSection />
                    
                </div>
            </main>
        </Layout>
    )
}

export default Shirts
