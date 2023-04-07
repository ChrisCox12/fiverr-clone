const Gig = require('../models/gig');


async function getGig(req, res) {
    const { id } = req.params;

    try {
        const gig = await Gig.findById(id);

        if(!gig) return res.status(404).send('Gig not found');

        res.status(200).send(gig);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function getGigs(req, res) {
    const query = req.query;
    console.log(query)

    const filters = {
        ...(query.category && { 
            category: { $regex: query.category, $options: 'i' } 
        }),
        ...((query.min || query.max) && {
            price: { 
                ...(query.min && { $gt: query.min }), 
                ...(query.max && { $lt: query.max })
            }
        }),
        ...(query.search && { 
            title: { $regex: query.search, $options: 'i' } 
        })
    }

    //console.log(filters)

    try {
        const gigs = await Gig.find(filters).sort({ [query.sort]: 'descending' });

        if(!gigs) return res.status(404).send('No gigs found');

        res.status(200).send(gigs);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function getGigsByUserId(req, res) {
    //const { id } = req.params;
    const { userId, isSeller } = req;

    if(!isSeller) return res.status(403).send('Only Sellers can access this content');

    try {
        const gigs = await Gig.find({ creatorId: userId });

        if(!gigs) return res.send(404).send('No gigs found');
        
        res.status(200).send(gigs);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');    
    }
}

async function createGig(req, res) {
    const { userId, isSeller, body } = req;

    if(!isSeller) return res.status(403).send('Only Sellers can create gigs');

    try {
        const newGig = await Gig.create({
            ...body,
            creatorId: userId
        });

        //console.log(newGig)
        //console.log('new gig created')

        res.status(201).send(newGig);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function deleteGig(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try {
        const gig = await Gig.findById(id);

        if(!gig) return res.status(404).send('Gig not found');

        if(gig.userId !== userId) return res.status(403).send('Gigs can only be deleted by their creators');

        await gig.deleteOne();

        //console.log('gig deleted');

        res.status(200).send('Gig successfully deleted');
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}



module.exports = {
    createGig,
    deleteGig,
    getGig,
    getGigs,
    getGigsByUserId
}