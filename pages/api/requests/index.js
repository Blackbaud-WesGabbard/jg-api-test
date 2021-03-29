import axios from 'axios'
import qs from 'querystring'

const client = axios.create({
  baseURL: process.env.JG_API_URL,
  paramsSerializer: params => qs.stringify(params)
})

const setParams = (req) => ({
  campaignGuid: req,
  take: 100
})

export const campaign = id => client.get(`https://api.justgiving.com/campaigns/v2/campaign/${id}`).then(res => res).catch(err => err)

/*
export const pages = id => client.get('https://api.justgiving.com/fundraising/v2/pages', {
  campaignGuid: id,
  take: 100
}).then(res => res)
*/

export const pages = (req, res, next) =>
  client
    .get('https://api.justgiving.com/fundraising/v2/pages', { params: setParams(req) })
    .then(({ data }) => formatResults(data, req))
    .then(data => res.send(data))
    .catch(error => next(error))

export const leaderboard = id => axios.get('https://api.justgiving.com/fundraising/v1/pages', {
  campaignGuid: id,
  take: 100
}).then(res => res)

export const teams = id => axios.get(`https://api.justgiving.com/campaigns/v1/teams/search?CampaignGuid=${id}`)
