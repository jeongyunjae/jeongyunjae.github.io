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
          '브라우니 베타서비스 이후, 명확한 서비스 설명을 사용자에게 제공하기 위해 홈페이지 리뉴얼을 하여 프론트 개발을 진행했습니다.',
        techStack: ['react'],
        thumbnailUrl: 'brwnieMain.png',
        links: {
          demo: 'https://brwnie.kr',
        },
      },
    ],
  },
};
