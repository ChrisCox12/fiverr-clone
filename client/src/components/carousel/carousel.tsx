
import './carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { servicesProps, projectProps, gigCardProps, gigImageProps } from '../../types/propTypes';
//import popularServices from '../../data/popularServices.json';

/* const images = [
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/f27bec553efc12cc60baed89b8f2223e-1674661140708/ai-artists-2x.png', alt: 'AI Artists', title: 'AI Artists', subtitle: 'Add talent to AI' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png', alt: 'Logo Design', title: 'Logo Design', subtitle: 'Build your brand' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png', alt: 'WordPress', title: 'WordPress', subtitle: 'Customize your site' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png', alt: 'Voice Over', title: 'Voice Over', subtitle: 'Share your message' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png', alt: 'Video Explainer', title: 'Video Explainer', subtitle: 'Engage your audience' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png', alt: 'Social Media', title: 'Social Media', subtitle: 'Reach more customers' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png', alt: 'SEO', title: 'SEO', subtitle: 'Unlock growth online' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png', alt: 'Illustration', title: 'Illustration', subtitle: 'Color your dreams' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png', alt: 'Translation', title: 'Translation', subtitle: 'Go global' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png', alt: 'Data Entry', title: 'Data Entry', subtitle: 'Learn your business' },
    { src: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png', alt: 'Book Covers', title: 'Book Covers', subtitle: 'Showcase your story' },
] */

/* type CarouselProps = {
    data: {
        src: string,
        alt: string,
        title: string,
        subtitle: string
    }[];
};

type otherProps = {
    src: string
}; */

/* // this type is for the gig cards on the home page
type servicesProps = {
    services: {
        src: string,
        alt: string,
        title: string,
        subtitle: string
    }[];
}

type projectProps = {
    projects: {
        src: string,
        alt: string,
        creator: string,
        creatorImage: string,
        category: string
    }[];
}

// this type is for the gig cards that appear on the categories page
type gigCardProps = {
    gigCardImages: {
        images: [string],
        title: string,
        id: string
    };
}

type gigImageProps = {
    gigImages: {
        images: [string],
        title: string
    };
} */

export default function Carousel(props: servicesProps | projectProps | gigCardProps | gigImageProps) {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        initialSlide: 13,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
            }
        ]
    };
    
    let projectSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
    };

    let gigCardSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        initialSlide: 0
    }

    let gigImageSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        initialSlide: 0
    }
    const location = useLocation();
    

    return (
        /* data-gigcards returns true if the gigCardImages prop exists;
           data-categories returns true of 'categories' is in the pathname;
           these data attributes are used for some CSS purposes
        */
        <div className='Carousel' data-gigcards={'gigCardImages' in props} data-categories={location.pathname.includes('categories')}>
            {/* <h2>Popular professional services</h2> */}
            
            {/** if there's a data field in the props, then display the render the 1st block, else render the 2nd */}
            {('services' in props) ? (
                <>
                    <Slider {...settings}>
                        {props.services.map((service, index) => (
                            <div className='Carousel__card' key={`services-${index}`} data-service>
                                <Link to={'/'}>
                                    <div className='Carousel__card__titles'>
                                        <span className='subtitle'>{service.subtitle}</span>
                                        <span className='title'>{service.title}</span>
                                    </div>
                                    
                                    <img src={service.src} alt={service.alt} />
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </>
            ) 
            : ('projects' in props) ? (
                <>
                    <Slider {...projectSettings}>
                        {props.projects.map((project, index) => (
                            <div className='Carousel__card' key={`projects-${index}`} data-project>
                                <Link to={'/'}>
                                    {/* <div className='Carousel__card__titles'>
                                        <span className='title'>{project.category}</span>
                                        <span className='creator'>{project.creator}</span>
                                    </div> */}
                                    
                                    <img src={project.src} alt={project.alt} className='project-image' />
                                </Link>

                                <div className='project-info'>
                                    <img src={project.creatorImage} alt='Profile Image' className='project-creator-image' />

                                    <div>
                                        <Link to={'/'} className='project-category'>{project.category}</Link>
                                        <Link to={'/'} className='project-creator'>by {project.creator}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </>
            )
            : ('gigCardImages' in props) ? (
                <>
                    <Slider {...gigCardSettings}>
                        {props.gigCardImages.images.map((image, index) => (
                            <div className='Carousel__card' key={`gig-card-image-${index}`}>
                                <Link to={`/gig/${props.gigCardImages.id}`}>
                                    <img src={image} alt={props.gigCardImages.title} />
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </>
            ) 
            : (
                <>
                    <Slider {...gigCardSettings}>
                        {props.gigImages.images.map((image, index) => (
                            <div className='Carousel__card' key={`gig-image-${index}`}>
                                <img src={image} alt={props.gigImages.title} />
                            </div>
                        ))}
                    </Slider>
                </>
            )}

           {/* <Slider {...settings}>
                {data.map((service, index) => (
                    <div className='Carousel__card' key={`carousel-${index}`}>
                        <Link to={'/'}>
                            <div className='Carousel__card__titles'>
                                <span className='subtitle'>{service.subtitle}</span>
                                <span className='title'>{service.title}</span>
                            </div>
                            
                            <img src={service.src} alt={service.alt} />
                        </Link>
                    </div>
                ))}
            </Slider> */}
        </div>
    )
}