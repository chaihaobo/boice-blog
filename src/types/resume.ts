export interface WorkExperience {
    title: string;
    company: string;
    department: string;
    period: string;
    description: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export interface Resume {
    name: string;
    title: string;
    description: string;
    skills: Skill[];
    workExperiences: WorkExperience[];
    personalTraits: string[];
}

export const resume: Resume = {
    name: "Boice",
    title: "全栈工程师",
    description: "嗨，我是 Boice，一个热爱技术的全栈工程师。在过去的8年里，我一直在探索如何构建更好的软件系统。我喜欢钻研新技术，也享受和团队一起解决问题的过程。对我来说，写代码不仅是工作，更是一种创造和表达的方式。",
    skills: [
        {
            category: "后端开发",
            items: ["Go", "Java", "Python", "Rust", "Kotlin", "Scala", "NodeJS", "TypeScript"]
        },
        {
            category: "大数据技术",
            items: ["Hadoop", "Spark", "Flink", "Kafka", "ElasticSearch", "Zookeeper", "HBase"]
        },
        {
            category: "微服务架构",
            items: ["SpringCloud", "Dubbo", "gRPC", "Kubernetes", "Docker", "Istio"]
        },
        {
            category: "数据库",
            items: ["MySQL", "Oracle", "MongoDB", "Redis", "PostgreSQL", "ElasticSearch"]
        },
        {
            category: "前端开发",
            items: ["React", "Vue", "Angular", "Flutter", "HTML/CSS", "TypeScript"]
        },
        {
            category: "开发工具",
            items: ["Git", "Docker", "Jenkins", "Maven", "Gradle", "VS Code", "WebStorm"]
        }
    ],
    workExperiences: [
        {
            title: "高级 Golang 工程师",
            company: "某科技公司",
            department: "研发部",
            period: "2022.05 - 至今",
            description: "负责团队技术面试和新人培训，主导多个重要项目的技术选型和架构设计，提升团队开发效率和代码质量。"
        },
        {
            title: "高级爬虫工程师",
            company: "某科技公司",
            department: "研发部",
            period: "2022.02 - 2022.04",
            description: "负责数据采集系统的设计和开发，实现高效的数据抓取和处理。"
        },
        {
            title: "风控技术负责人",
            company: "某科技公司",
            department: "研发部",
            period: "2020.09 - 2022.02",
            description: "负责风控系统的设计和开发，构建高效的风控决策引擎，提升系统性能和准确性。"
        },
        {
            title: "高级 Java 工程师",
            company: "某科技公司",
            department: "研发部",
            period: "2020.03 - 2020.09",
            description: "负责中台系统开发，包括公共 SDK 编写、流程中心开发，以及多个业务模块的设计和实现。"
        },
        {
            title: "大数据开发工程师",
            company: "某科技公司",
            department: "研发部",
            period: "2019.01 - 2020.02",
            description: "负责大数据平台的设计和开发，处理日均 30G 的数据量，构建用户行为预警和监控告警系统。"
        }
    ],
    personalTraits: [
        "喜欢研究基础技术，有较强的学习能力",
        "对代码风格有一定的追求，注重代码质量",
        "良好的沟通能力和团队协作精神",
        "热爱运动，喜欢游戏"
    ]
}; 