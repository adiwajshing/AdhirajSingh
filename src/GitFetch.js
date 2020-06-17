const fetch = require('node-fetch')
module.exports = {
    /**
     * @returns {string[]} array of the names of the user's repos
     */
    fetchRepos: async function (username) {
        const response = await fetch (`https://api.github.com/users/${username}/repos`)
        const json = await response.json ()
        return json.map (e => e.full_name)
    },
    fetchDemoRepos: async function (username) {
        const repos = await this.fetchRepos (username)
        const tasks = repos.map (repo => this.fetchDemo (repo).catch ( err => {} ))
        return Promise.all (tasks)
        .then (arr => arr.filter(value => value))
    },
    fetchDemo: async function (repo) {
        const response = await fetch(`https://raw.githubusercontent.com/${repo}/master/demo/metadata.json`)
        if (response.status === 200) {
            var json = await response.json ()
            if (!Array.isArray(json.content)) {
                json.content = [json.content]
            }
            json.sample.url = `https://raw.githubusercontent.com/${repo}/master/demo/${json.sample.name}`
            json.url = `https://github.com/${repo}`

            if (json.sample.type === 'code') {   
                const codeText = await fetch (json.sample.url)
                json.sample.text = await codeText.text ()
            }
            return json
        }
        throw "demo not available"
    }
}