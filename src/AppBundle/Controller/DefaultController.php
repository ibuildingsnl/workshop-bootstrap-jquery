<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Method("GET")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }

    /**
     * @Route("/registration", name="registration")
     * @Method("GET")
     */
    public function registrationFormAction()
    {
        return $this->render('default/register.html.twig', []);
    }

    /**
     * @Route("/register", name="register")
     * @Method("POST")
     */
    public function registerAction()
    {
        return $this->redirect($this->generateUrl('registered'));
    }

    /**
     * @Route("/registered", name="registered")
     * @Method("GET")
     */
    public function registeredAction()
    {
        return $this->render('default/registered.html.twig', []);
    }

    /**
     * @Route("/check-email", name="check_email")
     * @Method("POST")
     */
    public function checkEmailAvailableAction(Request $request)
    {
        $query = json_decode($request->getContent());

        if ($query->email === 'seggen@ibuildings.nl') {
            $result = ['available' => false];
        } else {
            $result = ['available' => true];
        }

        return new JsonResponse($result);
    }
}
