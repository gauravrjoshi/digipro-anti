<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Portfolio;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use App\Models\Education;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Create User
            $user = User::firstOrCreate(
                ['email' => 'gauravjoshi.uk.in@gmail.com'],
                [
                    'name' => 'Gaurav Joshi',
                    'password' => Hash::make('password'),
                ]
            );

            // Create Portfolio
            $portfolio = Portfolio::create([
                'user_id' => $user->id,
                'slug' => 'gaurav',
                'full_name' => 'Gaurav Joshi',
                'role_title' => 'Web Developer',
                'bio' => 'I am a web developer with a passion for creating beautiful and functional websites. I have experience in various technologies and frameworks, and I am always eager to learn new skills.',
                'address' => 'Sector 26, Panchkula, Haryana - 134116',
                'phone' => '+91-8556909577',
                'email' => 'gauravjoshi.uk.in@gmail.com',
                'social_links' => [
                    ['platform' => 'x', 'url' => 'https://x.com/statelyworld'],
                    ['platform' => 'github', 'url' => 'https://github.com/gauravrjoshi'],
                    ['platform' => 'linkedin', 'url' => 'https://www.linkedin.com/in/imgauravrjoshi/'],
                    ['platform' => 'website', 'url' => 'https://statelyworld.com/']
                ],
                'theme_color' => '#6366f1'
            ]);

            // Projects
            $projects = [
                ['title' => 'Stately World', 'description' => 'Personal Blog & Portfolio with custom WP theme.', 'link' => 'https://statelyworld.com'],
                ['title' => 'Qimam Affan', 'description' => 'Modern responsive WordPress website.', 'link' => 'https://www.qimamaffan.com/'],
                ['title' => 'Green Power Technical', 'description' => 'Responsive corporate website.', 'link' => 'https://greenpowertechnical.com/'],
                ['title' => 'Vibcare Pharma', 'description' => 'Corporate pharma website.', 'link' => 'https://vibcare.co.in/'],
                ['title' => 'Furniture Plus', 'description' => 'E-commerce/Corporate site.', 'link' => 'https://furnitureplustt.com/'],
                ['title' => 'Waypoint Limited', 'description' => 'Corporate website.', 'link' => 'https://waypointlimited.com/']
            ];

            foreach ($projects as $proj) {
                Project::create(['portfolio_id' => $portfolio->id, ...$proj]);
            }

            // Skills
            $skills = [
                'Languages' => ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL'],
                'Frameworks & Ecosystem' => ['Laravel', 'Tailwind', 'Alpine.js', 'Livewire', 'Sanctum', 'Breeze', 'Inertia', 'React'],
                'Databases' => ['MySQL'],
                'Tools & DevOps' => ['Git', 'GitHub', 'Composer', 'NPM', 'Vite', 'Postman', 'Bitbucket', 'Jira', 'Slack'],
                'Testing & Architecture' => ['Unit Testing', 'Feature Testing', 'MVC', 'OOP', 'REST APIs', 'JWT Auth'],
                'CMS' => ['WordPress', 'Joomla', 'Magento 2']
            ];

            foreach ($skills as $category => $skillList) {
                foreach ($skillList as $skill) {
                    Skill::create([
                        'portfolio_id' => $portfolio->id, 
                        'category' => $category, 
                        'name' => $skill,
                        'proficiency' => 80 // Default
                    ]);
                }
            }

            // Experience
            $experiences = [
                [
                    'role' => "Senior Laravel Developer",
                    'company' => "Om Ak Solutions",
                    'location' => "Tricity Plaza Panchkula",
                    'start_date' => "July 2023",
                    'end_date' => "Present",
                    'is_current' => true,
                    'details' => [
                        "Built a full fleet-management platform (BT Transport).",
                        "Designed multi-tenant architecture for Growyu CRM.",
                        "Converted BT Transport into a scalable SaaS (Fleetly).",
                        "Managed public-facing website for BEBC."
                    ]
                ],
                [
                    'role' => "Web Developer",
                    'company' => "ASC Softwares",
                    'location' => "Mohali",
                    'start_date' => "Jan 2019",
                    'end_date' => "July 2023",
                    'is_current' => false,
                    'details' => [
                        "Developed WordPress themes and plugins.",
                        "Maintained Magento 2 front-end components.",
                        "Created REST APIs in PHP/Laravel for apps."
                    ]
                ],
                [
                    'role' => "Web Developer",
                    'company' => "Vibcare Pharma",
                    'location' => "HSIIDC IT PARK, Panchkula",
                    'start_date' => "June 2017",
                    'end_date' => "Dec 2018",
                    'is_current' => false,
                    'details' => [
                        "Worked on website development and maintenance."
                    ]
                ]
            ];

            foreach ($experiences as $exp) {
                Experience::create(['portfolio_id' => $portfolio->id, ...$exp]);
            }
            
            // Education
            $education = [
                [
                    'institution' => 'Punjab Technical University, Jalandhar',
                    'degree' => 'B.TECH (IT)',
                    'start_year' => '2012',
                    'end_year' => '2016',
                ],
                [
                    'institution' => 'Government Inter College Gairsain (Uttarakhand)',
                    'degree' => 'Senior Secondary',
                    'start_year' => '2010',
                    'end_year' => '2011',
                ]
            ];
            
            foreach ($education as $edu) {
                Education::create(['portfolio_id' => $portfolio->id, ...$edu]);
            }

        });
    }
}
