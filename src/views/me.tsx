import {FC} from 'react';
import {Card, CardBody} from "@heroui/react";
import {motion} from "framer-motion";
import {resume} from '../types/resume';

const fadeInUp = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.5}
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Me: FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <motion.div
                className="space-y-8"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1 hover:scale-[1.01]">
                        <CardBody className="p-6">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <motion.h1
                                        className="text-3xl font-bold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                                        whileHover={{scale: 1.05}}
                                        transition={{duration: 0.3}}
                                    >
                                        {resume.name}
                                    </motion.h1>
                                    <motion.p
                                        className="text-default-500 text-base leading-relaxed tracking-wide"
                                        whileHover={{scale: 1.02}}
                                        transition={{duration: 0.3}}
                                    >
                                        {resume.description}
                                    </motion.p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <motion.h2
                                        className="text-xl font-semibold text-foreground tracking-tight"
                                        whileHover={{scale: 1.05}}
                                        transition={{duration: 0.3}}
                                    >
                                        联系方式
                                    </motion.h2>
                                    <div className="flex flex-col gap-1 text-default-500">
                                        <motion.p
                                            className="flex items-center gap-2"
                                            whileHover={{x: 5, scale: 1.02}}
                                            transition={{duration: 0.3}}
                                        >
                                            <motion.span
                                                className="text-primary"
                                                whileHover={{rotate: 360}}
                                                transition={{duration: 0.5}}
                                            >
                                            </motion.span>
                                        </motion.p>
                                        <motion.p
                                            className="flex items-center gap-2"
                                            whileHover={{x: 5, scale: 1.02}}
                                            transition={{duration: 0.3}}
                                        >
                                            <motion.span
                                                className="text-primary"
                                                whileHover={{rotate: 360}}
                                                transition={{duration: 0.5}}
                                            >
                                                📧
                                            </motion.span>
                                            <span>datachaihaobo@gmail.com</span>
                                        </motion.p>
                                        <motion.p
                                            className="flex items-center gap-2"
                                            whileHover={{x: 5, scale: 1.02}}
                                            transition={{duration: 0.3}}
                                        >
                                            <motion.span
                                                className="text-primary"
                                                whileHover={{rotate: 360}}
                                                transition={{duration: 0.5}}
                                            >
                                                🌐
                                            </motion.span>
                                            <motion.a
                                                href="https://github.com/chaihaobo"
                                                className="text-primary hover:text-primary-600 transition-colors"
                                                whileHover={{scale: 1.1}}
                                                transition={{duration: 0.3}}
                                            >
                                                github.com/chaihaobo
                                            </motion.a>
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1 hover:scale-[1.01]">
                        <CardBody className="p-6">
                            <div className="flex flex-col gap-6">
                                <motion.h2
                                    className="text-xl font-semibold text-foreground tracking-tight"
                                    whileHover={{scale: 1.05}}
                                    transition={{duration: 0.3}}
                                >
                                    技能栈
                                </motion.h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {resume.skills.map((skill) => (
                                        <motion.div
                                            key={skill.category}
                                            className="flex flex-col gap-2"
                                            whileHover={{scale: 1.02, rotate: 1}}
                                            transition={{duration: 0.3}}
                                        >
                                            <motion.h3
                                                className="text-lg font-medium text-foreground"
                                                whileHover={{scale: 1.05}}
                                                transition={{duration: 0.3}}
                                            >
                                                {skill.category}
                                            </motion.h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map((item) => (
                                                    <motion.span
                                                        key={item}
                                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm tracking-wide hover:bg-primary/20 transition-colors"
                                                        whileHover={{scale: 1.1, rotate: 2}}
                                                        transition={{duration: 0.3}}
                                                    >
                                                        {item}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1 hover:scale-[1.01]">
                        <CardBody className="p-6">
                            <div className="flex flex-col gap-6">
                                <motion.h2
                                    className="text-xl font-semibold text-foreground tracking-tight"
                                    whileHover={{scale: 1.05}}
                                    transition={{duration: 0.3}}
                                >
                                    工作经历
                                </motion.h2>
                                <div className="space-y-6">
                                    {resume.workExperiences.map((experience) => (
                                        <motion.div
                                            key={experience.title}
                                            className="flex flex-col gap-2"
                                            whileHover={{scale: 1.02, rotate: 1}}
                                            transition={{duration: 0.3}}
                                        >
                                            <div className="flex justify-between items-start">
                                                <motion.h3
                                                    className="text-lg font-medium text-foreground"
                                                    whileHover={{scale: 1.05}}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {experience.title}
                                                </motion.h3>
                                                <motion.span
                                                    className="text-sm text-default-500"
                                                    whileHover={{scale: 1.1}}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {experience.period}
                                                </motion.span>
                                            </div>
                                            <motion.p
                                                className="text-default-500"
                                                whileHover={{scale: 1.02}}
                                                transition={{duration: 0.3}}
                                            >
                                                {experience.company} · {experience.department}
                                            </motion.p>
                                            <motion.p
                                                className="text-default-500 text-sm leading-relaxed"
                                                whileHover={{scale: 1.02}}
                                                transition={{duration: 0.3}}
                                            >
                                                {experience.description}
                                            </motion.p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <Card
                        className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1 hover:scale-[1.01]">
                        <CardBody className="p-6">
                            <div className="flex flex-col gap-6">
                                <motion.h2
                                    className="text-xl font-semibold text-foreground tracking-tight"
                                    whileHover={{scale: 1.05}}
                                    transition={{duration: 0.3}}
                                >
                                    个人特点
                                </motion.h2>
                                <div className="space-y-2 text-default-500">
                                    {resume.personalTraits.map((trait) => (
                                        <motion.p
                                            key={trait}
                                            className="flex items-center gap-2"
                                            whileHover={{x: 5, scale: 1.02}}
                                            transition={{duration: 0.3}}
                                        >
                                            <motion.span
                                                className="text-primary"
                                                whileHover={{rotate: 360}}
                                                transition={{duration: 0.5}}
                                            >
                                                •
                                            </motion.span>
                                            <span>{trait}</span>
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Me;