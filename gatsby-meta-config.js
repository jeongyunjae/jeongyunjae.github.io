module.exports = {
  title: `yunjae-log`,
  description: `윤재의 개발로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.yunjaaae.com`,
  ogImage: `/og-image.png`, // Path to your the 'static' folder
  comments: {
    utterances: {
      repo: `jeongyunjae/jeongyunjae.github.io`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `정윤재`,
    bio: {
      role: `개발자`,
      description: ['시각적 표현을 즐기는', '비즈니스 가치를 두는', '이로운 것을 만드는'],
      thumbnail: 'yunjae.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/jeongyunjae`,
      linkedIn: `https://www.linkedin.com/in/%EC%9C%A4%EC%9E%AC-%EC%A0%95-0b562817a/`,
      email: `yunjae2295@naver.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2018.03 ~ 휴학',
        activity: '숭실대학교 소프트웨어학부',
      },
      {
        date: '2020.12 ~',
        activity: '하이어엑스 프론트엔드 개발자',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '무인매장 관리 서비스 브라우니 페이지',
        description:
          '브라우니 베타서비스 오픈 이후, 무엇을 하는 서비스인지, 뭘 제공하는 것인지를 사용자에게 보다 더 명확하게 보여주기 위해 브라우니 서비스의 얼굴인 랜딩페이지를 개발하였습니다. PC뿐만 아니라 모바일 화면 또한 지원합니다. ',
        techStack: ['react', 'styled-component'],
        thumbnailUrl: 'brwnie.png',
        links: {
          demo: 'https://brwnie.kr',
        },
      },
      {
        title: '무인매장 지도',
        description:
          '비즈니스적으로 실제 무인매장이 얼마나 있고, 어떤 종류가 있는지를 시각적으로 파악하기 위해 계획한 프로젝트입니다. 서비스 홍보물 배포 알바생분들이 지정한 포인트별로 길을 찾아갈 수 있도록 기능하며, 서비스 현장에 잘 도착할 수 있도록 브라우니 크루분들의 길 안내를 도웁니다. 또한 집 주변 무인매장이 어디에, 얼마나, 어떤게 있는지 궁금한 분들에게 질좋은 인사이트를 제공해드리기 위한 기능으로 만들었습니다.',
        techStack: ['react', 'naver-map', 'express'],
        thumbnailUrl: 'map.png',
        links: {
          demo: 'https://brwnie.kr/map',
        },
      },
    ],
  },
};
