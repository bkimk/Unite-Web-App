router.post('/logout', async (req,res)=>{
    console.log(req.body.data);

    const { email, ipaddress } = req.body.data;
    const action = 'logout';
    const timestamp = new Date();

    try {

        //this is important, since there's probably a vector for logging out an account that doesn't exist
        let user = await UserProfile.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const name = user['name'];

            
        
        const newlog = new AuditLog({
            email,
            ipaddress,
            timestamp,
            action
        });

        await newlog.save();

        // jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET,
        //     { expiresIn: 360000 },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token });
        //     }
        // );
        return res.status(200).json({ msg: 'Logged out' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body.data;

    try {
        let user = await UserProfile.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password 
        });

        await user.save();

        // Use JWT to create a token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//current location logic
router.post('/currentlocation', async (req, res) => {
    // Route logic...
    try {
        
        console.log(req.body);

        const userId = req.body.data.userID
        const updatedlatitude = req.body.data.latitude
        const updatedlongitude = req.body.data.longitude
        let updatedUser = await UserProfile.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "location.coordinates": [updatedlongitude, updatedlatitude]
                }
            },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ msg: "User is not found" })
        return res.status(200).json(updatedUser)
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
});

//todo
//password and username length and sanitation
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:' + req.body.email); 


    try {
        let user = await UserProfile.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Validate password
        const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        else{
            //audit log
        }

        res.status(200).send(user);


        jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ msg: 'Logged in', user, token });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/protected-endpoint', authenticateJWT, (req, res) => {
    res.send('You accessed the protected endpoint!');
});