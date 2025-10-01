import femaleUserAvatar from '../assets/female-user.png';
import maleUserAvatar from '../assets/male-user.png';

const FEMALE_AVATAR = femaleUserAvatar;
const MALE_AVATAR = maleUserAvatar;

const appData = {
  users: [
    {
      id: '1',
      name: 'Aditi Sharma',
      email: 'aditi@hackfinder.in',
      avatar: FEMALE_AVATAR,
      bio: 'Full-stack developer building fintech tools for the Indian market',
      skills: ['React', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL'],
      roles: ['Full Stack Developer', 'ML Engineer'],
      experience: 'intermediate',
      location: 'Bengaluru, India',
      github: 'github.com/aditi-codes',
      linkedin: 'linkedin.com/in/aditisharma',
      verified: true,
    },
    {
      id: '2',
      name: 'Rohit Verma',
      email: 'rohit@hackfinder.in',
      avatar: MALE_AVATAR,
      bio: 'UI/UX designer blending research with crisp visual systems',
      skills: ['Figma', 'React', 'CSS', 'JavaScript', 'Tailwind'],
      roles: ['UI/UX Designer', 'Frontend Developer'],
      experience: 'advanced',
      location: 'Mumbai, India',
      github: 'github.com/rohitverma',
      linkedin: 'linkedin.com/in/rohitverma',
      verified: true,
    },
    {
      id: '3',
      name: 'Karan Gupta',
      email: 'karan@hackfinder.in',
      avatar: MALE_AVATAR,
      bio: 'Backend engineer specialising in cloud-native healthcare systems',
      skills: ['Go', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'],
      roles: ['Backend Engineer', 'DevOps Engineer'],
      experience: 'advanced',
      location: 'Hyderabad, India',
      github: 'github.com/karangupta',
      linkedin: 'linkedin.com/in/karangupta',
      verified: false,
    },
    {
      id: '4',
      name: 'Priya Nair',
      email: 'priya@hackfinder.in',
      avatar: FEMALE_AVATAR,
      bio: 'Solidity developer focused on DeFi and Web3 experiences',
      skills: ['Solidity', 'Web3', 'Hardhat', 'Node.js'],
      roles: ['Blockchain Developer', 'Smart Contract Engineer'],
      experience: 'advanced',
      location: 'Kochi, India',
      github: 'github.com/priyanair',
      linkedin: 'linkedin.com/in/priyanair',
      verified: true,
    },
  ],
  posts: [
    {
      id: '1',
      type: 'team_seeking_members',
      title: 'UPI Insights Platform - Need Frontend Dev',
      description:
        'We are building a UPI analytics dashboard for fintech founders, combining RBI feeds with AI-powered insights. Looking for an experienced React developer to polish the product experience before launch.',
      owner_id: '1',
      owner_name: 'Aditi Sharma',
      owner_avatar: FEMALE_AVATAR,
      tech_tags: ['React', 'TypeScript', 'Web3', 'D3.js', 'Tailwind'],
      roles_needed: ['Frontend Developer'],
      team_size: 4,
      team_capacity: 5,
      current_members: [
        {
          name: 'Aditi Sharma',
          role: 'Product Lead',
          avatar: FEMALE_AVATAR,
        },
        {
          name: 'Rohan Desai',
          role: 'AI Engineer',
          avatar: MALE_AVATAR,
        },
        {
          name: 'Meera Iyer',
          role: 'Product Manager',
          avatar: FEMALE_AVATAR,
        },
        {
          name: 'Sahil Kapoor',
          role: 'Backend Engineer',
          avatar: MALE_AVATAR,
        },
      ],
      created_at: '2024-01-15',
    },
    {
      id: '2',
      type: 'individual_seeking_team',
      title: 'Product Designer Seeking Hackathon Team',
      description:
        "Hi! I'm a senior designer with 5+ years of experience in product design. I've won 3 hackathons and specialise in user research, prototyping, and frontend implementation. Looking for a team working on purpose-driven consumer apps.",
      owner_id: '2',
      owner_name: 'Rohit Verma',
      owner_avatar: MALE_AVATAR,
      tech_tags: ['Figma', 'React', 'Tailwind', 'Framer'],
      desired_roles: ['UI/UX Designer', 'Frontend Developer'],
      created_at: '2024-01-18',
    },
    {
      id: '3',
      type: 'team_seeking_members',
      title: 'AI Diagnostics Team - Hiring ML & Frontend',
      description:
        'We are building a clinical decision support tool for radiologists using computer vision and NLP. Pilot deployments with two Indian hospitals are live and we are expanding our technical team.',
      owner_id: '3',
      owner_name: 'Karan Gupta',
      owner_avatar: MALE_AVATAR,
      tech_tags: ['Python', 'TensorFlow', 'React', 'Node.js', 'AWS'],
      roles_needed: ['ML Engineer', 'Frontend Developer'],
      team_size: 3,
      team_capacity: 5,
      current_members: [
        {
          name: 'Karan Gupta',
          role: 'Tech Lead',
          avatar: MALE_AVATAR,
        },
        {
          name: 'Dr. Nisha Rao',
          role: 'Clinical Advisor',
          avatar: FEMALE_AVATAR,
        },
        {
          name: 'Vikram Menon',
          role: 'Data Scientist',
          avatar: MALE_AVATAR,
        },
      ],
      created_at: '2024-01-20',
    },
    {
      id: '4',
      type: 'individual_seeking_team',
      title: 'Blockchain Developer Seeking Web3 Project',
      description:
        'Solidity expert with 3 years in DeFi. Built multiple DEX protocols and NFT marketplaces. Looking for an innovative Web3 team to build the next big thing in decentralized finance or gaming.',
      owner_id: '4',
      owner_name: 'Priya Nair',
      owner_avatar: FEMALE_AVATAR,
      tech_tags: ['Solidity', 'Web3', 'React', 'Node.js', 'Hardhat'],
      desired_roles: ['Blockchain Developer', 'Smart Contract Engineer'],
      created_at: '2024-01-22',
    },
  ],
  interests: [
    {
      id: '1',
      user_id: '2',
      post_id: '1',
      message:
        "Hi Aditi! I'd love to join the UPI Insights build as the frontend owner. I've led two React fintech dashboards and can help polish the product experience.",
      roles: ['Frontend Developer'],
      status: 'pending',
      created_at: '2024-01-16',
    },
    {
      id: '2',
      user_id: '1',
      post_id: '2',
      message:
        "Hi Rohit! Your design-first mindset fits perfectly with our health tech hackathon squad. Let's sync to see if our timelines align.",
      roles: [],
      status: 'accepted',
      created_at: '2024-01-19',
    },
  ],
  currentUser: {
    id: '1',
    name: 'Aditi Sharma',
    email: 'aditi@hackfinder.in',
    avatar: FEMALE_AVATAR,
  },
};

export default appData;
