import github from './img/GitHub-Mark-64px.png'
import linkedin from './img/LI-In-Bug.png'
import sendmail from './img/sendmail.png'
export default {
    githubID: "adiwajshing",
    header: {
        title: "Adhiraj Singh",
        links: [
            {
                img: github,
                link: "https://github.com/adiwajshing"
            },
            {
                img: linkedin,
                link: "https://in.linkedin.com/in/adiwajshing"
            },
            {
                img: sendmail,
                link: "mailto:adhirajsingh1001@gmail.com"
            }
        ]
    },
    about: {
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet facilisis magna etiam tempor orci eu lobortis.`,
        map: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBPCJuu3zpRG09ByoPeds51qzc7rfHXa3Y&q=Chandigarh,India&zoom=6"
    },
    skillset: [
        {
            title: "Languages",
            elements: [ "Swift", "Javascript", "C", "Python", "SQL", "C#", "C++" ]
        },
        {
            title: "Environments",
            elements: [ "Node", "Vapor", "iOS", "Web (React)", "Android" ]
        },
        {
            title: "Tools",
            elements: [ "Unit-testing", "Docker", "AWS", "Google Cloud"]
        }
    ]
}