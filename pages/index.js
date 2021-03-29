import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from 'constructicon/button'
import Heading from 'constructicon/heading'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Section from 'constructicon/section'
import Loading from 'constructicon/loading'
import { campaign } from './api/requests'

export default function Home() {
  const [status, setStatus] = useState('fetched')
  const [totals, setTotal] = useState({
    total: 0,
    success: 0,
    fail: 0
  })

  const campaigns = [
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
    'a568b4a1-6ac2-40c3-9377-59d85e4b6bed',
    '1692ebd3-fb99-4554-86ca-8e1161fc4743',
    '127dc11e-0aec-4577-982e-a27f280b61d1',
    '29b5ad4b-6811-47cf-afd8-bb953c6f224c',
    '1461f126-a669-413f-a767-7474f7497308',
    '10d180ee-2b6f-4374-8dc0-ac02095860c6',
    '57678728-4976-4186-86fb-8c5f1c24d1d3',
    '182fbf40-a8d0-426d-b701-4e5647121e4c',
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
    'a568b4a1-6ac2-40c3-9377-59d85e4b6bed',
    '1692ebd3-fb99-4554-86ca-8e1161fc4743',
    '127dc11e-0aec-4577-982e-a27f280b61d1',
    '29b5ad4b-6811-47cf-afd8-bb953c6f224c',
    '1461f126-a669-413f-a767-7474f7497308',
    '10d180ee-2b6f-4374-8dc0-ac02095860c6',
    '57678728-4976-4186-86fb-8c5f1c24d1d3',
    '182fbf40-a8d0-426d-b701-4e5647121e4c',
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
    'a568b4a1-6ac2-40c3-9377-59d85e4b6bed',
    '1692ebd3-fb99-4554-86ca-8e1161fc4743',
    '127dc11e-0aec-4577-982e-a27f280b61d1',
    '29b5ad4b-6811-47cf-afd8-bb953c6f224c',
    '1461f126-a669-413f-a767-7474f7497308',
    '10d180ee-2b6f-4374-8dc0-ac02095860c6',
    '57678728-4976-4186-86fb-8c5f1c24d1d3',
    '182fbf40-a8d0-426d-b701-4e5647121e4c',
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
    'a568b4a1-6ac2-40c3-9377-59d85e4b6bed',
    '1692ebd3-fb99-4554-86ca-8e1161fc4743',
    '127dc11e-0aec-4577-982e-a27f280b61d1',
    '29b5ad4b-6811-47cf-afd8-bb953c6f224c',
    '1461f126-a669-413f-a767-7474f7497308',
    '10d180ee-2b6f-4374-8dc0-ac02095860c6',
    '57678728-4976-4186-86fb-8c5f1c24d1d3',
    '182fbf40-a8d0-426d-b701-4e5647121e4c',
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
    'a568b4a1-6ac2-40c3-9377-59d85e4b6bed',
    '1692ebd3-fb99-4554-86ca-8e1161fc4743',
    '127dc11e-0aec-4577-982e-a27f280b61d1',
    '29b5ad4b-6811-47cf-afd8-bb953c6f224c',
    '1461f126-a669-413f-a767-7474f7497308',
    '10d180ee-2b6f-4374-8dc0-ac02095860c6',
    '57678728-4976-4186-86fb-8c5f1c24d1d3',
    '182fbf40-a8d0-426d-b701-4e5647121e4c',
    '21a9307f-f28a-4f08-b91d-b0b63f42376a',
    'e68502c6-0770-4446-9fdb-ac70d459f9f1',
    'f14826da-7946-4cbe-8fa5-283524a4b856',
    '33fb2c1a-4db0-4cc0-ab3e-4eeccc8aba87',
    '7c8124f0-5588-4255-87db-86d8953a9030',
    'dce03bff-5d1d-4bba-bac6-789056f33d62',
    '30648998-98b2-4b91-bf89-a66b1e95433e',
    '5173d296-e577-4371-a919-8aefc61c364a',
    '8fbb8f77-6378-4874-85e7-06c491029fe5',
    'da41d715-6ba6-4cb5-889c-b693a157e232',
  ]

  const getCampaign = async(id) => {
    const res = await campaign(id)
    console.log(res)
    if (res.status === 200) {
      setTotal({
        ...totals,
        total: totals.total + 100,
        success: totals.success + 100
      })

    } else {
      console.log('has a fail')
      setTotal({
        ...totals,
        fail: totals.fail + 1
      })
    }
  }

  const getAllCampaigns = async () => {
    return Promise.allSettled(
      campaigns.map(async (id) => getCampaign(id))
    ).then(results => {
      console.log('res', results)
      return results
    })
  }
  const handleSubmit = async () => {
    setStatus('fetching')
    const response = await getAllCampaigns()
    console.log('await', response)

    setStatus('fetched')

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Test JG API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Test JG API using
        </h1>
        <p>uses get campaign endpoint to make approximately 100 calls</p>
        {status === 'fetching' ? (
          <Loading size={5} />
        ) : (
          <>
            <Button onClick={() => handleSubmit()}>
              Submit test
            </Button>
            <Section background='paleGrey' foreground='primary' styles={{ margin: '1rem', width: '100%' }}>
              <Grid spacing={1} justify='center'>
                <GridColumn sm={4} smAlign='center'>
                  <Heading children='Total' />
                  <div>
                    {totals.total}
                  </div>
                </GridColumn>
                  <GridColumn sm={4} smAlign='center'>
                  <Heading children='Success' />
                  <div>
                    {totals.success}
                  </div>
                </GridColumn>
                <GridColumn sm={4} smAlign='center'>
                  <Heading children='Fail' />
                  <div>
                    {totals.fail}
                  </div>
                </GridColumn>
              </Grid>
            </Section>
          </>
        )}

      </main>
    </div>
  )
}
