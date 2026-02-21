"use client";

import React from 'react'
import { eachDayOfInterval, endOfYear, formatISO, startOfYear } from "date-fns";
import { motion } from 'motion/react';
import { ContributionGraph, ContributionGraphBlock, ContributionGraphCalendar, ContributionGraphFooter } from '../kibo-ui/contribution-graph';
import { cn } from '@/lib/utils';


const maxCount = 20;
const maxLevel = 4;
const now = new Date();
const days = eachDayOfInterval({
  start: startOfYear(now),
  end: endOfYear(now),
});

const data = days.map((date) => {
  const c = Math.round(
    Math.random() * maxCount - Math.random() * (0.8 * maxCount)
  );
  const count = Math.max(0, c);
  const level = Math.ceil((count / maxCount) * maxLevel);

  return {
    date: formatISO(date, { representation: "date" }),
    count,
    level,
  };
});

function ActivitySection() {
  return (
    <section id="activity" className="py-32 bg-transparent border-t border-b border-border">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 mb-20">
            <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-foreground/40">Activity</h2>         
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl flex flex-col gap-8"
          >
            <h3 className="text-3xl md:text-4xl font-light leading-snug text-foreground/60">
              A visual record of <span className="text-foreground font-normal">consistency </span>and commitment to <span className="text-foreground font-normal">engineering </span>excellence.
            </h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-10"
            >
              <ContributionGraph className="" data={data}>
                <ContributionGraphCalendar className="font-mono tracking-[0.1em] text-foreground/80 ">
                  {({ activity, dayIndex, weekIndex }) => (
                  
                      <ContributionGraphBlock
                        activity={activity}
                        className={cn(
                           'data-[level="0"]:fill-[#c0c1c3] dark:data-[level="0"]:fill-[#161b22]',
            'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
            'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
            'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
            'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                        )}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      />
      
                  )}
                </ContributionGraphCalendar>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ContributionGraphFooter />
                </motion.div>
              </ContributionGraph>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

export default ActivitySection